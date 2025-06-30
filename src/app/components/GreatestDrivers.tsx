"use client";
import { useState } from "react";
import { PlusCircle } from "phosphor-react";

interface LegendaryDriver {
  rank: number;
  name: string;
  photoUrl: string;
  country: string;
  era: string;
  description: string;
}

const legendaryDrivers: LegendaryDriver[] = [
  { rank: 1, name: "Ayrton Senna", photoUrl: "https://media.api-sports.io/formula-1/drivers/1.png", country: "Brasil", era: "1984-1994", description: "Legenda dengan talenta luar biasa dan tiga gelar juara dunia." },
  { rank: 2, name: "Michael Schumacher", photoUrl: "https://media.api-sports.io/formula-1/drivers/30.png", country: "Jerman", era: "1991-2012", description: "Memegang rekor tujuh gelar juara dunia, ikon dominasi Ferrari." },
  { rank: 3, name: "Lewis Hamilton", photoUrl: "https://media.api-sports.io/formula-1/drivers/20.png", country: "Inggris", era: "2007-Sekarang", description: "Menyamai rekor tujuh gelar dan memegang banyak rekor F1 lainnya." },
  // ...tambahkan pembalap legendaris lainnya
];

export default function GreatestDrivers() {
  const [visibleCount, setVisibleCount] = useState(5);

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-red-400 mb-4">Pembalap Legendaris F1</h2>
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-left text-gray-700">
          <tr>
            <th className="p-3 font-semibold text-center w-12">Peringkat</th>
            <th className="p-3 font-semibold" colSpan={2}>
              Pemain
            </th>
            <th className="p-3 font-semibold">Era</th>
            <th className="p-3 font-semibold">Deskripsi Singkat</th>
          </tr>
        </thead>
        <tbody>
          {legendaryDrivers.slice(0, visibleCount).map((driver) => (
            <tr key={driver.rank} className="border-b border-gray-700 rounded-md last:border-b-0 shadow-sm relative transition-all duration-300 ease-in-out hover:scale-101 hover:shadow-md hover:shadow-red-400 ">
              <td className="p-3 font-extrabold text-2xl text-center text-gray-300">{driver.rank}</td>
              <td className="p-3 w-16">
                <img src={driver.photoUrl} alt={driver.name} className="h-12 w-12 rounded-full object-cover" />
              </td>
              <td className="p-3">
                <p className="font-bold text-base text-white">{driver.name}</p>
                <p className="text-gray-400">{driver.country}</p>
              </td>
              <td className="p-3 font-medium text-gray-300">{driver.era}</td>
              <td className="p-3 text-gray-300 max-w-xs">{driver.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
