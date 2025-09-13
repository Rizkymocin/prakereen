"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DynamicFormFields, {FieldConfig} from "@/app/components/layouts/DynamicFormFields";

export default function EditMagangDialog({ open, setOpen, data, handleChange, handleUpdate }: any) {
   
   const fields: FieldConfig[] = [
       { key: 'nama_perusahaan', label: 'Nama Perusahaan', type: 'text', placeholder: 'Masukkan nama perusahaan', required: true },
       { key: 'alamat', label: 'Alamat', type: 'textarea', placeholder: 'Masukkan alamat perusahaan', required: true }, 
       { key: 'email', label: 'Email', type: 'email', placeholder: 'Masukkan email perusahaan' },
       { key: 'telepon', label: 'Telepon', type: 'text', placeholder: 'Masukkan nomor telepon' },
       { key: 'penanggung_jawab', label: 'Penanggung Jawab', type: 'text', placeholder: 'Masukkan nama penanggung jawab' },
     ]
   
   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogContent className="max-h-[90vh] overflow-y-auto">
         <DialogHeader><DialogTitle>Edit Siswa</DialogTitle></DialogHeader>
         <DynamicFormFields fields={fields} data={data} onChange={handleChange} />
         <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Batal</Button>
            <Button className="bg-yellow-400 text-white" onClick={handleUpdate}>Simpan</Button>
         </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
