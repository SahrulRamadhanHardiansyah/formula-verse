import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

const API_KEY = process.env.FORMULA1_API_KEY;
const F1_API_BASE_URL = "https://v1.formula-1.api-sports.io";

async function fetchWithCache(url: string) {
  const res = await fetch(url, {
    headers: { "x-apisports-key": API_KEY! },
    next: { revalidate: 86400 }, // Cache data selama 1 hari
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.response;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Tidak terotentikasi" }, { status: 401 });
  }

  const userFavorites = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      favoriteDriverIds: { select: { playerApiId: true } },
      favoriteTeamIds: { select: { teamApiId: true } },
    },
  });

  if (!userFavorites) {
    return NextResponse.json({ favoriteDrivers: [], favoriteTeams: [] });
  }

  const driverPromises = userFavorites.favoriteDriverIds.map((fav) => fetchWithCache(`${F1_API_BASE_URL}/drivers?id=${fav.playerApiId}`));

  const teamPromises = userFavorites.favoriteTeamIds.map((fav) => fetchWithCache(`${F1_API_BASE_URL}/teams?id=${fav.teamApiId}`));

  const [driverResults, teamResults] = await Promise.all([Promise.all(driverPromises), Promise.all(teamPromises)]);

  const favoriteDrivers = driverResults.flat().filter(Boolean);
  const favoriteTeams = teamResults.flat().filter(Boolean);

  return NextResponse.json({ favoriteDrivers, favoriteTeams });
}
