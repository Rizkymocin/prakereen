'use client';

import { useState, useEffect, use } from "react";
import Sidebar from "@/app/components/layouts/Sidebar";
import Topbar from "@/app/components/layouts/Topbar";
import { Toaster } from "@/components/ui/sonner"
import { usePathname, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import {useAuthStore} from '@/stores/auth.store'

export default function AppLayout({ children }: { children: React.ReactNode }) {
   const pathname = usePathname();
   const router = useRouter();
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const verifyToken = useAuthStore((state) => state.verifyToken);  

   useEffect(() => {
      if(pathname === "/auth/login" || pathname === "/auth/register") return;

      (async () => {
         const isValid = await verifyToken();
         if(!isValid){
            router.push('/auth/login');
         }
         return;
      })();
   }, [pathname,router,verifyToken])

   if(pathname === "/auth/login" || pathname === "/auth/register") {
      return <>{children}</>;
   }

   return (
   <div className="min-h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="lg:pl-64">
         <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
         <main className="p-6 bg-slate-50 min-h-[calc(100vh-4rem)]">
            {children}
         </main>
      </div>
   </div>
   )
}