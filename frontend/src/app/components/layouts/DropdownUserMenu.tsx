"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOutIcon, UserIcon } from "lucide-react"
import { DropdownMenuGroup, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogFooter,
} from "@/components/ui/dialog"
import { useAuthStore } from "@/stores/auth.store"

export function DropdownUser() {
   const [openDialog, setOpenDialog] = React.useState(false)
   const logout = useAuthStore((state) => state.logout)
   const router = useRouter()
   const user = useAuthStore((state) => state.user)
   

   const handleConfirmLogout = () => {
      logout()
      router.push("/auth/login")
      setOpenDialog(false)
   }
   
   return (
      <>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <div className="flex items-center gap-2 cursor-pointer p-2 hover:bg-slate-100 rounded-xl">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600">
                     <UserIcon className="h-5 w-5 text-primary-foreground"/>
                  </div>
                  <div className="hidden sm:block text-left">
                     <p className="text-sm font-medium text-slate-900">
                        {user?.name}
                     </p>
                     <p className="text-xs text-slate-500">
                        {user?.role_names.includes("siswa") ? "Peserta Magang" : "Guru Pembimbing"}
                     </p>
                  </div>
               </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
               <DropdownMenuLabel className="flex flex-col">
                  <p className="text-sm font-medium text-slate-900">{user?.name}</p>
                  <p className="text-xs text-slate-500">{user?.email}</p>
               </DropdownMenuLabel>
               <DropdownMenuSeparator />
               <DropdownMenuGroup className="pl-2">
                  <DropdownMenuItem
                     onClick={() => setOpenDialog(true)}
                     className="text-md flex flex-row items-center cursor-pointer hover:border-0"
                  >
                     <LogOutIcon className="text-xs me-4"/>
                     <p className="text-red-400 text-sm">Log Out</p>
                  </DropdownMenuItem>
               </DropdownMenuGroup>
            </DropdownMenuContent>
         </DropdownMenu>

         {/* Dialog Konfirmasi Logout */}
         <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Konfirmasi Logout</DialogTitle>
                  <DialogDescription>
                     Apakah Anda yakin ingin keluar dari aplikasi?
                  </DialogDescription>
               </DialogHeader>
               <DialogFooter className="mt-4">
                  <Button variant="outline" onClick={() => setOpenDialog(false)}>
                     Batal
                  </Button>
                  <Button variant="destructive" onClick={handleConfirmLogout}>
                     Ya, Logout
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </>
   )
}
