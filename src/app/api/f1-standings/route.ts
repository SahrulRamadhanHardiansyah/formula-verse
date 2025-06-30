import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type");
  const season = "2023";

  if (!type || (type !== "drivers" && type !== "teams")) {
    return NextResponse.json({ error: "Parameter 'type' (drivers/teams) wajib ada." }, { status: 400 });
  }

  const apiKey = process.env.FORMULA1_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Konfigurasi server tidak lengkap." }, { status: 500 });
  }

  const url = `https://v1.formula-1.api-sports.io/rankings/${type}?season=${season}`;

  try {
    const res = await fetch(url, {
      headers: { "x-apisports-key": apiKey },
      next: { revalidate: 3600 }, // Cache selama 1 jam
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ error: "Gagal mengambil data klasemen F1.", details: errorData }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data.response);
  } catch (error) {
    console.error(`Fetch F1 Standings failed:`, error);
    return NextResponse.json({ error: "Terjadi kesalahan pada server." }, { status: 500 });
  }
}
