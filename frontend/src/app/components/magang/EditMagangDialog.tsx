"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogOverlay } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DynamicFormFields, {FieldConfig} from "@/app/components/layouts/DynamicFormFields";
import { Label } from "@/components/ui/label";
import StudentSearch from "@/app/components/magang/StudentSearch";
import DudiSearch from "@/app/components/magang/DudiSearch";
import { useEffect, useState } from "react";
import { Siswa } from "@/types";
import { api } from "@/lib/api";

export default function EditMagangDialog({ open, setOpen, data, allSiswa, allDudi, handleChange, handleUpdate }: any) {
   
   const fields: FieldConfig[] = [
      { key: 'periode_mulai', label: 'Periode Mulai', type: 'date', placeholder: 'Masukkan nama perusahaan', required: true },
      { key: 'periode_selesai', label: 'Periode Selesai', type: 'date', placeholder: 'Masukkan alamat perusahaan', required: true }, 
   ]
   
   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogOverlay className="fixed inset-0 z-50 bg-black/10 backdrop-blur-md" />
         <DialogContent className="max-h-[90vh] overflow-y-auto">
         <DialogHeader><DialogTitle>Edit Siswa</DialogTitle></DialogHeader>
         <div className="space-y-2">
            <Label>Nama Siswa</Label>
            <StudentSearch dataSiswa={allSiswa} defaultSiswa={data.siswa} onSelect={v => handleChange("siswa_id", v)}/>
         </div>
         <div className="space-y-2">
            <Label>Mitra DUDI</Label>
            <DudiSearch dataDudi={allDudi} defaultDudi={data.dudi}  onSelect={v => handleChange("dudi_id", v)}/>
         </div>
         <DynamicFormFields fields={fields} data={data} onChange={handleChange} />
         <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Batal</Button>
            <Button className="bg-yellow-400 text-white" onClick={handleUpdate}>Simpan</Button>
         </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
