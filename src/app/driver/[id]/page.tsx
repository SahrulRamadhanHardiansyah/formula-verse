import PembalapDetailClient from "./PembalapDetailClient";

async function getDriverDetails(driverId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/driver-detail?id=${driverId}`, {
    next: { revalidate: 86400 },
  });
  if (!response.ok) throw new Error("Gagal mengambil detail pembalap");
  return response.json();
}

export default async function PembalapDetailPage({ params }: { params: { id: string } }) {
  const details = await getDriverDetails(params.id);

  return (
    <main className="p-4 sm:p-6 md:p-8 bg-gray-900 min-h-screen text-white">
      <div className="max-w-4xl mx-auto">
        <PembalapDetailClient details={details} />
      </div>
    </main>
  );
}
