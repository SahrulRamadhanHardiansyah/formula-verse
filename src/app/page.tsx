"use client";

import UserMenu from "./components/UserMenu";
import RaceSchedule from "./components/RaceSchedule";
import DriverStandings from "./components/DriverStandings";
import ConstructorStandings from "./components/ConstructorStandings";
import GreatestDrivers from "./components/GreatestDrivers";

export default function Home() {
  return (
    <main className="p-4 sm:p-6 md:p-8 bg-gray-900 text-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-red-500 tracking-wider">F1-Verse</h1>
          <UserMenu />
        </div>

        {/* Jadwal Balapan Musim Ini */}
        <RaceSchedule />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Klasemen Pembalap */}
          <DriverStandings />

          {/* Klasemen Konstruktor */}
          <ConstructorStandings />
        </div>

        {/* Pembalap Legendaris */}
        <GreatestDrivers />
      </div>
    </main>
  );
}
