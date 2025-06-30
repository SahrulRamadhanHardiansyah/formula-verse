"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Flag, User, MapPin, Trophy, Heart } from "phosphor-react";
import { useFavorite } from "@/app/hooks/useFavorites";

interface TeamDetails {
  id: number;
  name: string;
  logo: string;
  base: string;
  first_team_entry: number;
  world_championships: number;
  president: string;
  director: string;
  technical_manager: string;
  engine: string;
  tyres: string;
}

export default function TeamDetailClient({ details }: { details: TeamDetails }) {
  const { isFavorited, toggleFavorite } = useFavorite({
    id: details.id,
    type: "team",
  });

  return (
    <>
      <Link href="/" className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 mb-6 font-semibold">
        <ArrowLeft size={18} weight="bold" />
        <span>Kembali ke Dashboard</span>
      </Link>

      <div className="space-y-8">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center gap-8 border border-gray-700 relative">
          <div className="p-4 bg-white rounded-md">
            <Image src={details.logo} alt={details.name} width={150} height={150} className="object-contain" />
          </div>
          <div className="flex-grow text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-white">{details.name}</h1>
            <p className="text-lg text-gray-400 flex items-center justify-center md:justify-start gap-2 mt-2">
              <MapPin size={20} /> Base: {details.base}
            </p>
            <p className="text-md text-gray-400 flex items-center justify-center md:justify-start gap-2">
              <Trophy size={20} /> Kejuaraan Dunia: {details.world_championships}
            </p>
          </div>
          <div className="absolute top-4 right-4">
            <button onClick={toggleFavorite} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition">
              <Heart size={24} weight={isFavorited ? "fill" : "regular"} className={isFavorited ? "text-red-500" : "text-gray-300"} />
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-red-400">Informasi Tim</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-200">
            <InfoItem icon={<User />} label="President" value={details.president} />
            <InfoItem icon={<User />} label="Director" value={details.director} />
            <InfoItem icon={<User />} label="Technical Manager" value={details.technical_manager} />
            <InfoItem icon={<Flag />} label="Musim Pertama" value={details.first_team_entry} />
            <InfoItem icon={<Trophy />} label="Mesin" value={details.engine} />
            <InfoItem icon={<Trophy />} label="Ban" value={details.tyres} />
          </div>
        </div>
      </div>
    </>
  );
}

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) => (
  <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-md border border-transparent shadow-sm relative transition-all duration-300 ease-in-out hover:scale-101 hover:shadow-md hover:shadow-red-400 hover:border-red-400">
    <div className="text-red-400">{icon}</div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);
