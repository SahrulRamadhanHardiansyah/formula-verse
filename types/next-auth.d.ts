import { User } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Mendefinisikan ulang tipe Session
   */
  interface Session {
    user: {
      /** Properti id, nama, email, gambar dari default session */
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;

      /** Properti baru dari skema Prisma Anda */
      favoriteDriverIds: string[];
      favoriteTeamIds: string[];
    } & DefaultSession["user"];
  }

  /** * Anda juga bisa mendefinisikan ulang tipe User jika perlu
   * untuk callback di route.ts
   */
  interface User {
    favoriteDriverIds: string[];
    favoriteTeamIds: string[];
  }
}
