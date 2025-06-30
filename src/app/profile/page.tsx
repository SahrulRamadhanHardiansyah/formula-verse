import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ProfileClient from "./ProfileClient";

async function getProfileData() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/api/auth/signin?callbackUrl=/profile");
  }
  return { user: session.user };
}

export default async function ProfilePage() {
  const { user } = await getProfileData();

  return (
    <main className="p-4 sm:p-6 md:p-8 bg-gray-900 min-h-screen text-white">
      <ProfileClient user={user} />
    </main>
  );
}
