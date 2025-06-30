import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const teamId = searchParams.get("id");

  if (!teamId) {
    return NextResponse.json({ error: "Parameter 'id' tim wajib ada." }, { status: 400 });
  }

  const apiKey = process.env.FORMULA1_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Konfigurasi server tidak lengkap." }, { status: 500 });
  }

  const url = `https://v1.formula-1.api-sports.io/teams?id=${teamId}`;

  try {
    const res = await fetch(url, {
      headers: { "x-apisports-key": apiKey },
      next: { revalidate: 86400 }, // Cache data tim selama 1 hari
    });

    if (!res.ok) {
      throw new Error("Gagal mengambil data detail tim dari API eksternal.");
    }

    const data = await res.json();

    if (!data.response || data.response.length === 0) {
      return NextResponse.json({ error: "Tim tidak ditemukan." }, { status: 404 });
    }

    return NextResponse.json(data.response[0]);
  } catch (error) {
    console.error("Fetch failed (Team Detail):", error);
    return NextResponse.json({ error: "Terjadi kesalahan pada server." }, { status: 500 });
  }
}
