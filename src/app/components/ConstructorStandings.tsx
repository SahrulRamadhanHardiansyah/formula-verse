"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Heart } from "phosphor-react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface TeamStanding {
  position: number;
  team: { id: number; name: string; logo: string };
  points: number;
}

export default function ConstructorStandings() {
  const { data: session } = useSession();
  const router = useRouter();
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [loading, setLoading] = useState(true);

  const favoriteTeamIds = useMemo(() => {
    return new Set(session?.user?.favoriteTeamIds || []);
  }, [session]);

  const handleToggleFavorite = useCallback(
    async (teamId: number) => {
      if (!session?.user) {
        toast.error("Anda harus login untuk menambahkan favorit.");
        return;
      }

      const isCurrentlyFavorited = favoriteTeamIds.has(String(teamId));

      try {
        if (isCurrentlyFavorited) {
          await axios.delete(`/api/favorites?type=team&id=${teamId}`);
          toast.success("Dihapus dari favorit");
        } else {
          await axios.post("/api/favorites", { type: "team", id: String(teamId) });
          toast.success("Ditambahkan ke favorit!");
        }
        router.refresh();
      } catch (error) {
        toast.error("Terjadi kesalahan.");
      }
    },
    [session, favoriteTeamIds, router]
  );

  useEffect(() => {
    fetch("/api/f1-standings?type=teams&season=2023")
      .then((res) => res.json())
      .then((data) => {
        setStandings(data.slice(0, 10));
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="bg-gray-800 p-4 rounded-lg">
        <p>Memuat klasemen konstruktor...</p>
      </div>
    );

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="font-bold text-xl mb-4 text-red-400">Klasemen Konstruktor</h3>
      <ul className="space-y-3">
        {standings.map((item) => {
          const isFavorited = favoriteTeamIds.has(String(item.team.id));

          return (
            <li
              key={item.team.id}
              className="flex items-center gap-4 p-2 bg-gray-700 rounded-md border border-transparent shadow-sm relative transition-all duration-300 ease-in-out hover:bg-gray-600 hover:scale-101 hover:shadow-md hover:shadow-red-400 hover:border-red-400"
            >
              <span className="font-bold w-6 text-center">{item.position}</span>
              <img src={item.team.logo} alt={item.team.name} className="h-10 w-10 object-contain" />
              <Link href={`/team/${item.team.id}`} className="font-semibold flex-grow hover:underline">
                {item.team.name}
              </Link>
              <span className="font-extrabold text-lg">{item.points}</span>
              {session?.user && (
                <button onClick={() => handleToggleFavorite(item.team.id)} className="p-1">
                  <Heart size={20} weight={isFavorited ? "fill" : "regular"} className={isFavorited ? "text-red-500" : "text-gray-400 hover:text-white"} />
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
