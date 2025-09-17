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
import { Plus, PlusCircle, PlusSquare } from "lucide-react";

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


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white"><PlusCircle />Tambah Data DUDI</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah DUDI Mitra</DialogTitle>
          <DialogDescription>Isi form untuk menambahkan perusahaan mitra DUDI.</DialogDescription>
        </DialogHeader>
        <DynamicFormFields fields={dynamicFormFields} data={data} onChange={handleChange} />
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Batal</Button>
          <Button onClick={handleAdd}>Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
