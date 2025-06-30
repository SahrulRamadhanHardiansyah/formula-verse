"use client";

import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";
import { ArrowLeft, User as UserIcon, Shield, CircleNotch } from "phosphor-react";
import { useState, useEffect } from "react";

interface FavoriteDriver {
  id: number;
  name: string;
  image: string;
}

interface FavoriteTeam {
  id: number;
  name: string;
  logo: string;
}

export default function ProfileClient({ user }: { user: Session["user"] }) {
  const [favoriteDrivers, setFavoriteDrivers] = useState<FavoriteDriver[]>([]);
  const [favoriteTeams, setFavoriteTeams] = useState<FavoriteTeam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/favorites-details");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setFavoriteDrivers(data.favoriteDrivers || []);
        setFavoriteTeams(data.favoriteTeams || []);
      } catch (error) {
        console.error("Gagal mengambil detail favorit:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 mb-6 font-semibold transition-colors">
        <ArrowLeft size={18} weight="bold" />
        <span>Kembali ke Dashboard</span>
      </Link>

      <div className="space-y-8">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex items-center gap-6 border border-gray-700">
          <Image src={user?.image || ""} alt={user?.name || "User Avatar"} width={80} height={80} className="rounded-full" />
          <div>
            <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
            <p className="text-gray-400">{user?.email}</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <CircleNotch size={32} className="animate-spin inline-block text-red-500" />
            <p className="mt-2">Memuat favorit...</p>
          </div>
        ) : (
          <>
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-4 flex items-center text-red-400 gap-2">
                <Shield size={24} /> Tim Favorit
              </h2>
              {favoriteTeams.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoriteTeams.map((team) => (
                    <Link href={`/team/${team.id}`} key={team.id} className="flex items-center gap-3 p-3 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors">
                      <Image src={team.logo} alt={team.name} width={40} height={40} className="object-contain" />
                      <span className="font-semibold text-gray-200">{team.name}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">Anda belum memiliki tim favorit.</p>
              )}
            </div>

            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-4 flex items-center text-red-400 gap-2">
                <UserIcon size={24} /> Pembalap Favorit
              </h2>
              {favoriteDrivers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoriteDrivers.map((driver) => (
                    <Link href={`/driver/${driver.id}`} key={driver.id} className="flex items-center gap-3 p-3 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors">
                      <Image src={driver.image} alt={driver.name} width={40} height={40} className="rounded-full object-cover" />
                      <span className="font-semibold text-gray-200">{driver.name}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">Anda belum memiliki pembalap favorit.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
