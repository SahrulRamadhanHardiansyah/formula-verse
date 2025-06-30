"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { Heart } from "phosphor-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

interface DriverStanding {
  position: number;
  driver: { id: number; name: string; image: string };
  team: { name: string; logo: string };
  points: number;
}

export default function DriverStandings() {
  const { data: session } = useSession();
  const router = useRouter();
  const [standings, setStandings] = useState<DriverStanding[]>([]);
  const [loading, setLoading] = useState(true);

  const favoriteDriverIds = useMemo(() => {
    return new Set(session?.user?.favoriteDriverIds || []);
  }, [session]);

  const handleToggleFavorite = useCallback(
    async (driverId: number) => {
      if (!session?.user) {
        toast.error("Anda harus login untuk menambahkan favorit.");
        return;
      }

      const isCurrentlyFavorited = favoriteDriverIds.has(String(driverId));

      try {
        if (isCurrentlyFavorited) {
          await axios.delete(`/api/favorites?type=driver&id=${driverId}`);
          toast.success("Dihapus dari favorit");
        } else {
          await axios.post("/api/favorites", { type: "driver", id: String(driverId) });
          toast.success("Ditambahkan ke favorit!");
        }
        router.refresh();
      } catch (error) {
        toast.error("Terjadi kesalahan.");
      }
    },
    [session, favoriteDriverIds, router]
  );

  useEffect(() => {
    setLoading(true);
    fetch("/api/f1-standings?type=drivers&season=2023")
      .then((res) => res.json())
      .then((data) => {
        setStandings(data.slice(0, 10));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Gagal memuat klasemen pembalap.");
      });
  }, []);

  if (loading)
    return (
      <div className="bg-gray-800 p-4 rounded-lg">
        <p>Memuat klasemen pembalap...</p>
      </div>
    );

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="font-bold text-xl mb-4 text-red-400">Klasemen Pembalap</h3>
      <ul className="space-y-3">
        {standings.map((item) => {
          const isFavorited = favoriteDriverIds.has(String(item.driver.id));

          return (
            <li
              key={item.driver.id}
              className="flex items-center gap-4 p-2 bg-gray-700 rounded-md border border-transparent shadow-sm relative transition-all duration-300 ease-in-out hover:bg-gray-600 hover:scale-101 hover:shadow-md hover:shadow-red-400 hover:border-red-400"
            >
              <span className="font-bold w-6 text-center">{item.position}</span>
              <img src={item.driver.image} alt={item.driver.name} className="h-10 w-10 rounded-full object-cover" />
              <div className="flex-grow">
                <Link href={`/driver/${item.driver.id}`} className="font-semibold hover:underline">
                  {item.driver.name}
                </Link>
                <p className="text-xs text-gray-400">{item.team.name}</p>
              </div>
              <span className="font-extrabold text-lg">{item.points}</span>

              {session?.user && (
                <button onClick={() => handleToggleFavorite(item.driver.id)} className="p-1">
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
