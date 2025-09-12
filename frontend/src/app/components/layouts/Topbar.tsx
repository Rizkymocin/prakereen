"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Bell, Menu,Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DropdownUser } from "@/app/components/layouts/DropdownUserMenu"

// Modern Navbar Component
const Navbar = ({ onMenuClick }: { onMenuClick: () => void }) => {
   const pathname = usePathname();
   
   const menuMap: Record<string, string> = {
   };
   
   const title = menuMap[pathname] || 'SMK Negeri 1 Limboto';
   
   return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
         <div className="container flex h-16 items-center justify-between px-6">
         <div className="flex items-center space-x-4">
            <Button
               variant="ghost"
               size="icon"
               className="lg:hidden"
               onClick={onMenuClick}
            >
               <Menu className="h-5 w-5" />
            </Button>
            <div className="flex flex-col items-left space-x-2">
               <h2 className="text-l font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">{title}</h2>
               <p className="text-sm text-slate-500 -mt-1">Sistem Pelaporan Magang Siswa</p>
            </div>
         </div>
         
         <div className="flex items-center space-x-4">
            <div className="me-10">
               <DropdownUser />
            </div>
         </div>
         </div>
      </header>
   );
};

export default Navbar;