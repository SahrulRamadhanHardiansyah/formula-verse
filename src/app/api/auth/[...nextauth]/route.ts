import NextAuth, { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { Adapter } from "next-auth/adapters";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;

        const userFavorites = await prisma.user.findUnique({
          where: { id: user.id },
          include: {
            favoriteTeamIds: { select: { teamApiId: true } },
            favoriteDriverIds: { select: { playerApiId: true } },
          },
        });

        if (userFavorites) {
          session.user.favoriteTeamIds = userFavorites.favoriteTeamIds.map((fav) => String(fav.teamApiId));
          session.user.favoriteDriverIds = userFavorites.favoriteDriverIds.map((fav) => String(fav.playerApiId));
        }
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
