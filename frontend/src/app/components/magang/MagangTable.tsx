"use client";

import { DataTable } from "@/app/components/layouts/Table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ConfirmDeleteDialog from "@/app/components/layouts/DeleteDialog";
import AddMagangDialog from "@/app/components/magang/AddMagangDialog";
import { Badge } from "@/components/ui/badge";
import type { DataMagang } from "@/types";
import {Building2, Calendar, Edit, Mail, MailIcon, MapPin, Phone, Pin, Trash, Trash2, User, UserIcon } from "lucide-react";

export default function MagangTable({
   dataMagang,
   handleEdit,
   handleDelete,
   addDialogOpen,
   setAddDialogOpen,
   data,
   handleChange,
   handleAdd,
   }: {
   dataMagang: DataMagang[];
   handleEdit: (dudi: DataMagang) => void;
   handleDelete: (id: number) => void;
   addDialogOpen: boolean;
   setAddDialogOpen: (v: boolean) => void;
   data: Partial<DataMagang>;
   handleChange: (key: string, value: string | number) => void;
   handleAdd: () => void;
}) {

   const filteredMagang = dataMagang;

   const columns = [
      {
         accessorKey: "siswa",
         header: "Siswa",
         accessorFn: (row: DataMagang) => row.siswa.user.name,
         cell: ({ row }: any) => (
            <div className="flex items-center gap-2 p-2">
               <div className="flex-shrink-0 w-10 h-10 align-top bg-cyan-500 rounded-lg flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-gray-50" />
               </div>
               
               <div className="flex flex-col text-start gap-1">
                  <span className="font-semibold text-gray-800 text-sm">
                     {row.original.siswa.user.name}
                  </span>
                  <span className="text-xs text-gray-500">
                     NIS: {row.original.siswa.nis}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                     <Mail className="w-3 h-3" />
                     <span>{row.original.siswa.user.email}</span>
                  </div>
               </div>
            </div>
         ),
      },
      {
         accessorKey: "kelas_jurusan",
         header: "Kelas & Jurusan",
         cell: ({ row }: any) => (
            <div className="flex items-center gap-2 p-2">               
               <div className="flex flex-col text-start gap-1">
                  <span className="font-medium text-gray-800 text-sm">
                     {row.original.siswa.kelas.tingkat} {row.original.siswa.kelas.jurusan.jurusan} {row.original.siswa.kelas.rombel}
                  </span>
                  <span className="text-xs text-gray-500">
                     {row.original.siswa.kelas.jurusan.jurusan}
                  </span>
                  <span className="text-xs text-gray-500">
                     <Phone className="w-3 h-3 inline-block mr-1" />{row.original.siswa.telepon}
                  </span>
               </div>
            </div>
         ),
      },
      {
         accessorKey: "dudi",
         header: "DUDI",
         cell: ({ row }: any) => (
            <div className="flex items-center gap-2 p-2">
               <div className="flex-shrink-0 w-6 h-6 align-top bg-gray-200 rounded-lg flex items-center justify-center">
                  <Building2 className="w-3 h-3 text-gray-700" />
               </div>
               
               <div className="flex flex-col text-start gap-1">
                  <span className="font-semibold text-gray-800 text-sm">
                     {row.original.dudi.nama_perusahaan}
                  </span>
                  <span className="text-xs text-gray-500">
                     {row.original.dudi.alamat.match(/,\s*([A-Za-z\s]+)\s\d{5},/)[1]}
                  </span>
               </div>
            </div>
         ),
      },
      {
         accessorKey: "periode",
         header: "Periode",
         cell: ({ row }: any) => (
            <div className="flex items-center gap-2 p-2">               
               <div className="flex flex-col text-start gap-1">
                  <span className="text-xs text-gray-500">
                     <Calendar className="w-3 h-3 inline-block mr-1" />{row.original.periode_mulai}
                  </span>
                  <span className="text-xs text-gray-500">
                     s/d {row.original.periode_selesai}
                  </span>
               </div>
            </div>
         ),
      },
      {
         accessorKey: "status",
         header: "Status",
         cell: ({ row }: any) => (
            <div className="flex items-center gap-2 p-2">               
               <div className="flex flex-col text-start gap-1">
                  <span className="text-xs">
                     {
                        row.original.status === 'aktif' ? <Badge className="bg-green-100 text-green-800">Aktif</Badge> :
                        row.original.status === 'selesai' ? <Badge className="bg-blue-100 text-blue-800">Selesai</Badge> :
                        row.original.status === 'pending' ? <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge> :
                        <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
                     }
                  </span>
               </div>
            </div>
         ),
      },
      {
         accessorKey: "nilai",
         header: "Nilai",
         cell: ({ row }: any) => (
            <div className="flex items-center gap-2 p-2">               
               <div className="flex flex-col text-start gap-1">
                  <span className="text-xs">
                     {
                        row.original.nilai !== null ? 
                        <Badge className="bg-amber-600 text-white-200">{row.original.nilai}</Badge> :
                        "-" 
                     }
                  </span>
               </div>
            </div>
         ),
      },
      {
         header: "Aksi",
         cell: ({ row }: any) => {
         const dudi: DataMagang = row.original;
         return (
            <div className="flex gap-2 justify-center items-center">
               <Button variant="link" onClick={() => handleEdit(dudi)} className="cursor-pointer hover:bg-cyan-50 hover:text-sky-600 rounded-4xl">
                  <Edit className="w-2 h-2" />
               </Button>
               <Dialog>
               <DialogTrigger asChild>
                  <Button variant="link" className="cursor-pointer hover:bg-red-50 hover:text-red-600 rounded-4xl"><Trash2 /></Button>
               </DialogTrigger>
               <ConfirmDeleteDialog onConfirm={() => handleDelete(dudi.id)} />
               {/* <ConfirmDeleteDialog onConfirm={() => handleDelete(dudi.id)} /> */}
               </Dialog>
            </div>
         );
         },
      },
   ];

   return (
      <DataTable
         columns={columns}
         data={filteredMagang}
         actions={
         <AddMagangDialog
            open={addDialogOpen}
            setOpen={setAddDialogOpen}
            data={data}
            handleChange={handleChange}
            handleAdd={handleAdd}
         />
         }
      />
   );
}
