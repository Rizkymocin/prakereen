"use client";

import { DataTable } from "@/app/components/layouts/Table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ConfirmDeleteDialog from "@/app/components/layouts/DeleteDialog";
import AddDudiDialog from "@/app/components/dudi/AddDudiDialog";

import type { Dudi } from "@/types";
import { Building2, Edit, Mail, MapPin, Phone, Pin, Trash, Trash2, User, UserIcon } from "lucide-react";

export default function DudiTable({
   dataDudi,
   handleEdit,
   handleDelete,
   addDialogOpen,
   setAddDialogOpen,
   data,
   handleChange,
   handleAdd,
   }: {
   dataDudi: Dudi[];
   handleEdit: (dudi: Dudi) => void;
   handleDelete: (id: number) => void;
   addDialogOpen: boolean;
   setAddDialogOpen: (v: boolean) => void;
   data: Partial<Dudi>;
   handleChange: (key: string, value: string | number) => void;
   handleAdd: () => void;
}) {
  // Filter data by kelas jika dipilih
   const filteredDudi = dataDudi;

   const columns = [
      {
         accessorKey: "nama_perusahaan",
         header: "Perusahaan",
         cell: ({ row }: any) => (
            <div className="flex items-center gap-2 p-2">
               <div className="flex-shrink-0 w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-gray-50" />
               </div>
               
               <div className="flex flex-col gap-1">
                  <h3 className="font-semibold text-gray-900 text-sm text-start">
                     {row.original.nama_perusahaan}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                     <MapPin className="w-3 h-3" />
                     <span>{row.original.alamat}</span>
                  </div>
               </div>
            </div>
         ),
      },
      {
         accessorKey: "kontak",
         header: "Kontak",
         cell: ({ row }: any) => (
            <div className="flex items-center gap-2 p-2">               
               <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                     <Mail className="w-3 h-3" />
                     <span>{row.original.email}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                     <Phone className="w-3 h-3" />
                     <span>{row.original.telepon}</span>
                  </div>
               </div>
            </div>
         ),
      },
      {
         accessorKey: "penanggung_jawab",
         header: "Penanggung Jawab",
         cell: ({ row }: any) => (
            <div className="flex items-center gap-2 p-2">               
               <div className="flex gap-1">
                  <div className="flex-shrink-0 w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center">
                     <UserIcon className="w-3 h-3 text-black-200" />
                  </div>
                  <div className="flex text-semibold items-center gap-1 text-sm text-gray-600">
                     <span className="">{row.original.penanggung_jawab}</span>
                  </div>
               </div>
            </div>
         ),
      },
      {
         header: "Aksi",
         cell: ({ row }: any) => {
         const dudi: Dudi = row.original;
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
         data={filteredDudi}
         actions={
         <AddDudiDialog
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
