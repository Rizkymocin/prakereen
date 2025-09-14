"use client";

import { DataTable } from "@/app/components/layouts/Table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ConfirmDeleteDialog from "@/app/components/layouts/DeleteDialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Eye, MoreHorizontal, Pencil, Trash, Mail, MapPin, Phone, UserIcon, Calendar, Camera } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import type { DataLogbook } from "@/types";
import { log } from "console";

export default function LogbookTable({
   dataLogbook,
   handleEdit,
   handleDelete,
   addDialogOpen,
   setAddDialogOpen,
   data,
   handleChange,
   handleAdd,
   }: {
   dataLogbook: DataLogbook[];
   handleEdit: (logbook: DataLogbook) => void;
   handleDelete: (id: number) => void;
   addDialogOpen: boolean;
   setAddDialogOpen: (v: boolean) => void;
   data: Partial<DataLogbook>;
   handleChange: (key: string, value: string | number) => void;
   handleAdd: () => void;
}) {
  // Filter data by kelas jika dipilih
   const filteredLogbook = dataLogbook;

   const columns = [
      {
         accessorKey: "siswa",
         header: "Siswa & Tanggal",
         cell: ({ row }: any) => (
            <div className="flex items-center gap-2 p-2">
               <div className="flex-shrink-0 w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-gray-50" />
               </div>
               
               <div className="flex flex-col gap-1">
                  <h3 className="font-semibold text-gray-900 text-sm text-start">
                     {row.original.magang.siswa.nama}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                     <Calendar className="w-3 h-3" />
                     <span>{row.original.tanggal}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                     <Camera className="w-3 h-3" />
                     <span>{row.original.file !== "null" ? "Ada foto" : ""}</span>
                  </div>
               </div>
            </div>
         ),
      },
      {
         accessorKey: "kegiatan",
         header: "Kegiatan & Kendala",
         cell: ({ row }: any) => (
            <div className="flex items-center gap-2 p-2">               
               <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                     Kegiatan:
                  </div>
                  <div className="flex text-start items-center gap-1 text-md w-100 break-words whitespace-normal">
                     {row.original.kegiatan}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                     Kendala:
                  </div>
                  <div className="flex text-start gap-1 text-md w-100 break-words whitespace-normal">
                     {row.original.kendala}
                  </div>
               </div>
            </div>
         ),
      },
      {
         accessorKey: "status",
         header: "Status",
         cell: ({ row }: any) => (
            <div className="flex items-center gap-2 p-2">               
               <div className="flex gap-1">
                  <div className="flex text-semibold items-center gap-1 text-sm text-gray-600">
                     <span className="text-xs">
                     {
                        row.original.status_verifikasi === 'disetujui' ? <Badge className="bg-green-100 border-green-200 text-green-800">Disetujui</Badge> :
                        row.original.status_verifikasi === 'pending' ? <Badge className="bg-blue-100 border-blue-200 text-blue-800">Belum Diverifikasi</Badge> :
                        row.original.status_verifikasi === 'ditolak' ? <Badge className="bg-red-100 border-red-200 text-red-800">Ditolak</Badge> :
                        <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
                     }
                  </span>
                  </div>
               </div>
            </div>
         ),
      },
      {
         accessorKey: "catatan",
         header: "Catatan",
         cell: ({ row }: any) => (
            <div className="flex items-center gap-2 p-2">               
               <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                     Guru:
                  </div>
                  <div className="flex text-start gap-1 text-gray-600 text-xs p-2 border border-gray-200 rounded w-50 break-words whitespace-normal">
                     {row.original.kegiatan}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                     DUDI:
                  </div>
                  <div className="flex text-start gap-1 text-gray-600 text-xs p-2 border border-gray-200 rounded w-50 break-words whitespace-normal">
                     {row.original.kendala}
                  </div>
               </div>
            </div>
         ),
      },
      {
         header: "Aksi",
         cell: ({ row }: any) => {
         const logbook: DataLogbook = row.original;
         return (
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon"><MoreHorizontal className="w-5 h-5" /></Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild className="text-sky-600">
                     <Link href={`/guru/logbook/${row.original.id}`} className="w-full">
                        <Eye className="mr-2 h-4 w-4 text-sky-600" /> Lihat
                     </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-orange-600" onClick={() => handleEdit(logbook)}>
                     <Pencil className="mr-2 h-4 w-4 text-orange-600" /> Edit
                  </DropdownMenuItem>
                  <Dialog>
                  <DialogTrigger asChild>
                     <DropdownMenuItem className="text-red-800" onSelect={(e) => e.preventDefault()}>
                        <Trash className="mr-2 h-4 w-4 text-red-800" /> Hapus
                     </DropdownMenuItem>
                  </DialogTrigger>
                  <ConfirmDeleteDialog onConfirm={() => handleDelete(row.original)} />
                  </Dialog>
               </DropdownMenuContent>
            </DropdownMenu>
         );
         },
      },
   ];

   return (
      <DataTable
         columns={columns}
         data={filteredLogbook}
      />
   );
}
