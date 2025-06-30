"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemo, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface IUseFavorite {
  id: number;
  type: "driver" | "team";
}

export const useFavorite = ({ id, type }: IUseFavorite) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const currentUser = session?.user;

  const isFavorited = useMemo(() => {
    if (!currentUser) {
      return false;
    }

    const list = type === "driver" ? currentUser.favoriteDriverIds : currentUser.favoriteTeamIds;

    return list?.includes(String(id)) || false;
  }, [currentUser, id, type]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        toast.error("Anda harus login untuk menambahkan favorit.");
        return;
      }

      try {
        if (isFavorited) {
          await axios.delete(`/api/favorites?type=${type}&id=${id}`);
          toast.success("Dihapus dari favorit");
        } else {
          await axios.post("/api/favorites", { type, id: String(id) });
          toast.success("Ditambahkan ke favorit!");
        }
        router.refresh();
      } catch (error) {
        toast.error("Terjadi kesalahan.");
        console.error(error);
      }
    },
    [currentUser, isFavorited, id, type, router]
  );

  return {
    isFavorited,
    toggleFavorite,
  };
};
