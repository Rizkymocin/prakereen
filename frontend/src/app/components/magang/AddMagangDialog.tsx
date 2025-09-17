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
import { DialogOverlay } from "@radix-ui/react-dialog";
import { PlusCircle } from "lucide-react";

export default function AddMagangDialog({
  dynamicFormFields,
  open,
  setOpen,
  data,
  handleChange,
  handleAdd,

}: {
  dynamicFormFields: FieldConfig[]
  open: boolean;
  setOpen: (v: boolean) => void;
  data: any;
  handleChange: (key: string, value: string | number) => void;
  handleAdd: () => void;
}) {
  const [siswa, setSiswa] = useState<Siswa[]>([]);
  const [dudi, setDudi] = useState<any[]>([]);
  const [form, setForm] = useState<any>({
    siswa_id: 0,
    dudi_id: 0,
    periode_mulai: "",
    periode_selesai: "",
    status: "",
  });

  

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
        <Button className="bg-blue-600 text-white">
          <PlusCircle />
          Tambah Data Magang
        </Button>
      </DialogTrigger>
      <DialogOverlay className="fixed inset-0 z-50 bg-black/10 backdrop-blur-md" />
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
        <DynamicFormFields fields={dynamicFormFields} data={data} onChange={handleChange} />
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Batal</Button>
          <Button onClick={handleAdd}>Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
