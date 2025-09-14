"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bell, Menu, X, Home, Users, ChartBar, Search, LayoutDashboard, Building2, GraduationCap, BookOpen, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ConfirmLogoutDialog from "@/app/components/layouts/LogoutDialog";
import {toast} from "sonner"
import { api } from "@/lib/api";
import { guruMenuItems, siswaMenuItems } from '@/config/sidebar'
import { useAuthStore } from "@/stores/auth.store";
import type { MenuItem } from "@/types";

const Sidebar = ({
   isOpen,
   onClose,
   }: {
   isOpen: boolean;
   onClose: () => void;
   }) => {
   const pathname = usePathname();
   const user = useAuthStore((state) => state.user);
   const [keterangan, setKeterangan] = useState("");
   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

   useEffect(() => {
      if(user?.role_names.includes("siswa")){
         setKeterangan("Portal Siswa");
         setMenuItems(siswaMenuItems);
      }else {
         setKeterangan("Management");
         setMenuItems(guruMenuItems);
      }
   }, [user]);
   
   

   const handleLogout = async () => {
      // Implementasi Logout
      console.log("Data deleted");
      const res = await api.post('/logout');
      if (res.data.status) {
         localStorage.removeItem('token');
         toast.success("Berhasil logout")
         setTimeout(() => {
         window.location.href = '/auth/login';
         }, 1500);
      }
      onClose(); // Tutup dialog setelah logout
   }   
   
   function normalizePath(path: string) {
      if (!path.startsWith("/")) {
         path = "/" + path;
      }
      return path.replace(/\/$/, "") || "/";
   }

   const SidebarContent = () => (
      <div className="flex h-full flex-col bg-background">
         {/* Header */}
         <div className="flex h-16 items-center justify-between px-6 border-b">
         <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-lg bg-linear-to-r from-cyan-500 to-sky-600 flex items-center justify-center">
               <span className="text-primary-foreground font-semibold text-sm"><GraduationCap className="h-5 w-5"/></span>
            </div>
            <div className="flex flex-col">
               <h1 className="text-lg font-semibold text-slate-900 leading-tight">Prakereen</h1>
               <p className="text-sm text-slate-500 -mt-0.5">{keterangan}</p>
            </div>
         </div>
         <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-8 w-8"
            onClick={onClose}
         >
            <X className="h-4 w-4" />
         </Button>
         </div>
         
         {/* Navigation */}
         <nav className="flex-1 px-4 py-6 space-y-2">
         {menuItems.map(({ href, label, description, icon: Icon}) => {
            const currentPath = normalizePath(pathname);
            const isActive = currentPath === normalizePath(href);
            return (
               <Link
               key={href}
               href={href}
               onClick={onClose}
               className={cn(
                  "flex items-center justify-between w-full rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ",
                  isActive
                     ? "bg-linear-to-r from-cyan-500 to-sky-600 text-primary-foreground shadow-sm"
                     : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
               )}
               >
               <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors bg-white/20">
                     <Icon className="h-4 w-4" />
                  </div>
                  <div>
                     <div className="text-sm font-medium">{label}</div>
                     <div className={cn(
                        "text-xs mt-0.5",
                        isActive ? "text-white/80" : "text-slate-400"
                     )}>
                        {description}
                     </div>
                  </div>
               </div>
               </Link>
            );
         })}
         </nav>
         
         {/* Footer */}
         <div className="p-4 border-t">
         <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
            <Avatar className="h-8 w-8">
               <AvatarFallback className="bg-blue-600 text-primary-foreground text-xs">
               <Rocket className="h-4 w-4"/>
               </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
               <p className="text-sm font-medium truncate">Versi 1.0.0</p>
               <p className="text-xs text-muted-foreground truncate">
               build with ❤ by Rizky Mohi
               </p>
            </div>
         </div>
         </div>
      </div>
   );
   
   return (
      <>
         {/* Desktop Sidebar */}
         <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64 lg:overflow-y-auto lg:border-r">
         <SidebarContent />
         </aside>
         
         {/* Mobile Sidebar */}
         <Sheet open={isOpen} onOpenChange={onClose}>
         <SheetContent side="left" className="p-0 w-64">
            <SidebarContent />
         </SheetContent>
         </Sheet>
      </>
   );
};

export default Sidebar; 