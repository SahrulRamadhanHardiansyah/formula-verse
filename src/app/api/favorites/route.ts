import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

async function getUserSession() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return null;
  }
  return session.user;
}

export async function POST(request: NextRequest) {
  const user = await getUserSession();
  if (!user) {
    return NextResponse.json({ error: "Tidak terotentikasi" }, { status: 401 });
  }

  try {
    const { type, id } = await request.json();
    const apiId = parseInt(id, 10);

    if (isNaN(apiId)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    if (type === "driver") {
      await prisma.favoritePlayer.create({
        data: { playerApiId: apiId, userId: user.id },
      });
    } else if (type === "team") {
      await prisma.favoriteTeam.create({
        data: { teamApiId: apiId, userId: user.id },
      });
    } else {
      return NextResponse.json({ error: "Tipe favorit tidak valid" }, { status: 400 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Gagal menambahkan favorit:", error);
    return NextResponse.json({ error: "Gagal menambahkan favorit." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const user = await getUserSession();
  if (!user) {
    return NextResponse.json({ error: "Tidak terotentikasi" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const id = searchParams.get("id");
    const apiId = id ? parseInt(id, 10) : null;

    if (!type || !apiId) {
      return NextResponse.json({ error: "Parameter type dan id wajib ada" }, { status: 400 });
    }

    if (type === "driver") {
      await prisma.favoritePlayer.deleteMany({
        where: { playerApiId: apiId, userId: user.id },
      });
    } else if (type === "team") {
      await prisma.favoriteTeam.deleteMany({
        where: { teamApiId: apiId, userId: user.id },
      });
    } else {
      return NextResponse.json({ error: "Tipe favorit tidak valid." }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Gagal menghapus favorit:", error);
    return NextResponse.json({ error: "Gagal menghapus favorit." }, { status: 500 });
  }
}
