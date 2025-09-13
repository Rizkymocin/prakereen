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
import { Label } from "@/components/ui/label";
import StudentSearch from "@/app/components/magang/StudentSearch";
import DudiSearch from "@/app/components/magang/DudiSearch";
import { useEffect, useState } from "react";
import { Siswa } from "@/types";
import { api } from "@/lib/api";

export default function AddMagangDialog({
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
  const [siswa, setSiswa] = useState<Siswa[]>([]);
  const [dudi, setDudi] = useState<any[]>([]);

  const fields: FieldConfig[] = [
    { key: 'nama_perusahaan', label: 'Nama Perusahaan', type: 'text', placeholder: 'Masukkan nama perusahaan', required: true },
    { key: 'alamat', label: 'Alamat', type: 'textarea', placeholder: 'Masukkan alamat perusahaan', required: true }, 
    { key: 'email', label: 'Email', type: 'email', placeholder: 'Masukkan email perusahaan' },
    { key: 'telepon', label: 'Telepon', type: 'text', placeholder: 'Masukkan nomor telepon' },
    { key: 'penanggung_jawab', label: 'Penanggung Jawab', type: 'text', placeholder: 'Masukkan nama penanggung jawab' },
  ]

  useEffect(() => {
    const fetchSiswa = async () => {
      try {
        const res = await Promise.all([
          api.get('/siswa'),
          api.get('/dudi')
        ]);
        setDudi(res[1].data.data.dudi);
        setSiswa(res[0].data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSiswa();

  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white">Tambah Data Magang</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah Data Magang</DialogTitle>
          <DialogDescription>Isi form untuk menambahkan Data Magang.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label>Nama Siswa</Label>
          <StudentSearch dataSiswa={siswa} onSelect={v => handleChange("siswa_id", v)}/>
        </div>
        <div className="space-y-2">
          <Label>Mitra DUDI</Label>
          <DudiSearch dataDudi={dudi} onSelect={v => handleChange("dudi_id", v)}/>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Batal</Button>
          <Button onClick={handleAdd}>Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
