"use client"

import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SiswaPage() {
   const user = useAuthStore((state) => state.user);
   const router = useRouter();

   useEffect(() => {
      if (!user) {
         router.push("/auth/login");
      }
   }, [user, router]);

   return (
      <h1 className="text-xl font-semibold">
         Selamat Datang, {user?.name ?? "..." }
      </h1>
   );
}