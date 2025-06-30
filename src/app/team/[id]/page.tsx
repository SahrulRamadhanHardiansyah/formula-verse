import TeamDetailClient from "./TeamDetailClient";

async function getTeamDetails(teamId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/team-detail?id=${teamId}`, {
    next: { revalidate: 86400 }, // Cache 1 hari
  });
  if (!response.ok) {
    throw new Error("Gagal mengambil detail tim");
  }
  return response.json();
}

export default async function TeamDetailPage({ params }: { params: { id: string } }) {
  const details = await getTeamDetails(params.id);

  return (
    <main className="p-4 sm:p-6 md:p-8 bg-gray-900 min-h-screen text-white">
      <div className="max-w-5xl mx-auto">
        <TeamDetailClient details={details} />
      </div>
    </main>
  );
}
