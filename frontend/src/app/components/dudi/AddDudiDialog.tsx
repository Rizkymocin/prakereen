"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DynamicFormFields, {FieldConfig} from "@/app/components/layouts/DynamicFormFields";

export default function AddSiswaDialog({
  open,
  setOpen,
  data,
  handleChange,
  handleAdd,

}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  data: any;
  handleChange: (key: string, value: string | number) => void;
  handleAdd: () => void;
}) {
  
  const fields: FieldConfig[] = [
    { key: 'nama_perusahaan', label: 'Nama Perusahaan', type: 'text', placeholder: 'Masukkan nama perusahaan', required: true },
    { key: 'alamat', label: 'Alamat', type: 'textarea', placeholder: 'Masukkan alamat perusahaan', required: true }, 
    { key: 'email', label: 'Email', type: 'email', placeholder: 'Masukkan email perusahaan' },
    { key: 'telepon', label: 'Telepon', type: 'text', placeholder: 'Masukkan nomor telepon' },
    { key: 'penanggung_jawab', label: 'Penanggung Jawab', type: 'text', placeholder: 'Masukkan nama penanggung jawab' },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white">Tambah DUDI Mitra</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah DUDI Mitra</DialogTitle>
          <DialogDescription>Isi form untuk menambahkan perusahaan mitra DUDI.</DialogDescription>
        </DialogHeader>
        <DynamicFormFields fields={fields} data={data} onChange={handleChange} />
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Batal</Button>
          <Button onClick={handleAdd}>Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
