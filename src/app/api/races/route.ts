import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.FORMULA1_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Konfigurasi server tidak lengkap." }, { status: 500 });
  }

  const season = "2023";
  const url = `https://v1.formula-1.api-sports.io/races?season=${season}&type=race`;

  try {
    const res = await fetch(url, {
      headers: { "x-apisports-key": apiKey },
      next: { revalidate: 86400 }, // Cache 1 hari
    });

    if (!res.ok) {
      throw new Error("Gagal mengambil jadwal balapan.");
    }

    const data = await res.json();
    // Urutkan berdasarkan tanggal
    data.response.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return NextResponse.json(data.response);
  } catch (error) {
    console.error("Fetch races failed:", error);
    return NextResponse.json({ error: "Terjadi kesalahan pada server." }, { status: 500 });
  }
}
