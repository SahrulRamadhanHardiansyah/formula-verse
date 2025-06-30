"use client";

import { ArrowLeft, Trophy, Flag, Car, Heart } from "phosphor-react";
import Link from "next/link";
import { useFavorite } from "@/app/hooks/useFavorites";

interface DriverDetails {
  id: number;
  name: string;
  image: string;
  nationality: string;
  birthdate: string;
  birthplace: string;
  grands_prix_entered: number;
  world_championships: number;
  podiums: number;
  teams: Array<{ season: number; team: { name: string; logo: string } }>;
}

export default function PembalapDetailClient({ details }: { details: DriverDetails }) {
  const currentTeam = details.teams[details.teams.length - 1]?.team;
  const { isFavorited, toggleFavorite } = useFavorite({
    id: details.id,
    type: "driver",
  });

  return (
    <>
      <Link href="/" className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 mb-4 font-semibold">
        <ArrowLeft size={18} weight="bold" />
        <span>Kembali ke Dashboard</span>
      </Link>

      <div className="space-y-8">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col sm:flex-row items-center gap-6 border border-transparent shadow-sm relative transition-all duration-300 ease-in-out hover:scale-101 hover:shadow-md hover:shadow-red-400 hover:border-red-400">
          <img src={details.image} alt={details.name} className="h-40 w-40 rounded-full object-cover border-4 border-red-500" />
          <div className="flex-grow text-center sm:text-left">
            <h1 className="text-4xl font-extrabold text-white">{details.name}</h1>
            <p className="text-lg text-gray-300">{details.nationality}</p>
            {currentTeam && <p className="text-md text-gray-400">Tim Saat Ini: {currentTeam.name}</p>}
          </div>

          <div className="absolute top-4 right-4">
            <button onClick={toggleFavorite} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors" aria-label="Toggle Favorite">
              <Heart size={24} weight={isFavorited ? "fill" : "regular"} className={isFavorited ? "text-red-500" : "text-gray-300"} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-gray-800 p-4 rounded-lg border border-transparent shadow-sm relative transition-all duration-300 ease-in-out hover:scale-101 hover:shadow-md hover:shadow-red-400 hover:border-red-400">
            <Trophy size={32} className="mx-auto text-yellow-400 mb-2" />
            <p className="font-bold text-2xl">{details.world_championships}</p>
            <p className="text-sm text-gray-400">Gelar Dunia</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-transparent shadow-sm relative transition-all duration-300 ease-in-out hover:scale-101 hover:shadow-md hover:shadow-red-400 hover:border-red-400">
            <Flag size={32} className="mx-auto text-green-400 mb-2 " />
            <p className="font-bold text-2xl">{details.podiums}</p>
            <p className="text-sm text-gray-400">Podium</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-transparent shadow-sm relative transition-all duration-300 ease-in-out hover:scale-101 hover:shadow-md hover:shadow-red-400 hover:border-red-400">
            <Car size={32} className="mx-auto text-blue-400 mb-2" />
            <p className="font-bold text-2xl">{details.grands_prix_entered}</p>
            <p className="text-sm text-gray-400">Balapan</p>
          </div>
        </div>
      </div>
    </>
  );
}
