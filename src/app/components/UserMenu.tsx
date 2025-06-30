"use client";

import { useState } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { UserCircle, SignOut } from "phosphor-react";

export default function UserMenu() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (status === "loading") {
    return <div className="h-10 w-10 bg-gray-700 rounded-full animate-pulse" />;
  }

  if (status === "unauthenticated") {
    return (
      <button onClick={() => signIn("github")} className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition">
        Login
      </button>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="relative">
        <button onClick={() => setIsOpen(!isOpen)} className="transition-transform duration-200 hover:scale-110">
          <Image src={session.user?.image || "/default-avatar.png"} alt={session.user?.name || "User Avatar"} width={40} height={40} className="rounded-full border-2 border-gray-600" />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-1 z-10 border border-gray-700">
            <Link href="/profile" onClick={() => setIsOpen(false)} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 transition-colors">
              <UserCircle size={18} />
              Profile
            </Link>
            <button onClick={() => signOut()} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors">
              <SignOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    );
  }

  return null;
}
