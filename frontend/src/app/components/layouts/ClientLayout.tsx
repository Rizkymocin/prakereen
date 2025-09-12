"use client"

import { usePathname } from "next/navigation"
import { use } from "react";
import AppLayout from "@/app/components/layouts/AppLayout";
export default function ClientLayout({ children }: { children: React.ReactNode }) {
   const pathname = usePathname();

   const useLayoutPath = [
      "/", 
      "/guru/dudi", 
      "/guru/magang", 
      "/guru/logbook", 
      "/siswa", 
      "/siswa/logbook", 
      "/siswa/dudi", 
      "/siswa/magang"
   ];

   const noLayoutPath = [
      "/auth/login",
      "/auth/register",
      "/404",
      "/not-found",
   ]

   if (noLayoutPath.includes(pathname)) {
      return <>{children}</>;
   }

   const useAppLayout = useLayoutPath.some((p) => pathname.startsWith(p));

   if(useAppLayout) {
      return <AppLayout>{children}</AppLayout>;
   }

   return <>{children}</>
}