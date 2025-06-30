"use client";

import { useEffect, useState } from "react";

interface Race {
  id: number;
  competition: {
    name: string;
    location: { country: string; city: string };
  };
  circuit: { name: string; image: string };
  date: string;
  status: string;
}

export default function RaceSchedule() {
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/races")
      .then((res) => res.json())
      .then((data) => {
        setRaces(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-5">Memuat jadwal balapan...</p>;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-red-400 mb-4">Jadwal Balapan 2023</h2>
      <div className="flex overflow-x-auto gap-4 pb-4 pl-2 pt-2 scrollbar-hide">
        {races.map((race) => (
          <div
            key={race.id}
            className="bg-gray-700 rounded-lg p-4 w-64 flex-shrink-0 text-center border border-transparent shadow-sm relative transition-transform duration-300 ease-in-out hover:bg-gray-600 hover:scale-105 hover:shadow-md hover:shadow-red-400 hover:border-red-400"
          >
            <h3 className="font-bold text-lg">{race.competition.name}</h3>
            <p className="text-sm text-gray-400">{race.circuit.name}</p>
            <img src={race.circuit.image} alt={race.circuit.name} className="h-24 mx-auto my-3 rounded-md" />
            <p className="font-semibold">
              {new Date(race.date).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
            <span className={`px-2 py-1 text-xs rounded-full mt-2 inline-block ${race.status === "Scheduled" ? "bg-blue-500" : "bg-green-500"}`}>{race.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
