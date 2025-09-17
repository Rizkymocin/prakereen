"use client";

import PageTitle from "@/app/components/layouts/PageTitle";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import DudiTable from "@/app/components/dudi/DudiTable";
import { StatCard } from "@/app/components/dashboard/StatCard";
import EditDudiDialog from "@/app/components/dudi/EditDudiDialog";
import type { Dudi } from "@/types"; // pakai tipe buatanmu
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Building2, BuildingIcon, UserIcon } from "lucide-react";
import { FieldConfig } from "@/app/components/layouts/DynamicFormFields";
import getEmptyFields from "@/lib/getEmptyFields"

export default function DudiPage() {
   const [dataDudi, setDataDudi] = useState<Dudi[]>([]);
   const [data, setData] = useState<Omit<Dudi, 'id' | 'created_at' | 'updated_at'>>({
      nama_perusahaan: "", alamat: "", email: "", kuota: 0, bidang_usaha: "", telepon: "", penanggung_jawab: ""
   });
   const [dudiStat, setDudiStat] = useState({
      totalDudi: 0,
      dudiWithMagang: 0,
      rerataSiswaPerDudi: 0,
   });

   const [editingId, setEditingId] = useState<number | null>(null);
   const [editDialogOpen, setEditDialogOpen] = useState(false);
   const [addDialogOpen, setAddDialogOpen] = useState(false);

   useEffect(() => {
      const fetchData = async() => {
         try {
         const [dudiResponse] = await Promise.all([
            api.get('/dudi'),
         ]);
         setDataDudi(dudiResponse.data.data.dudi);
         setDudiStat(dudiResponse.data.data.stat);
         console.log(dudiResponse);
         
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      } 
      fetchData();
   }, []);

   const handleChange = (key: string, value: string | number) =>
      setData((prev) => ({ ...prev, [key]: value }));

   const resetForm = () =>
      setData({ nama_perusahaan: "", alamat: "", kuota: 0, bidang_usaha: "", email: "", telepon: "", penanggung_jawab: ""});

   // Validasi field kosong

   const addFormField: FieldConfig[] = [
      { key: 'nama_perusahaan', label: 'Nama Perusahaan', type: 'text', placeholder: 'Masukkan nama perusahaan', required: true },
      { key: 'alamat', label: 'Alamat', type: 'textarea', placeholder: 'Masukkan alamat perusahaan', required: true }, 
      { key: 'email', label: 'Email', type: 'email', placeholder: 'Masukkan email perusahaan' },
      { key: 'kuota', label: 'Kuota', type: 'number', placeholder: '0', required: true },
      { key: 'bidang_usaha', label: 'Bidang Usaha', type: 'text', placeholder: 'Masukkan Bidang Usaha' },
      { key: 'telepon', label: 'Telepon', type: 'text', placeholder: 'Masukkan nomor telepon' },
      { key: 'penanggung_jawab', label: 'Penanggung Jawab', type: 'text', placeholder: 'Masukkan nama penanggung jawab', required: true },
      { key: 'deskripsi', label: 'Deskripsi DUDI', type: 'textarea', placeholder: 'Tuliskan deskripsi singkat DUDI'},
   ]

   const handleAdd = async () => {
      const empty = getEmptyFields(data, addFormField)
      if(empty.length > 0){
         toast.error("Kolom ini perlu disii : " + empty.join(", "));
         return;
      }
      
      const res = await api.post('/dudi', {
         ...data,
      });

      if(res.data.status){
         toast.success(res.data.message);

         setTimeout(() => {
         window.location.reload();
         }, 1500);
      }

      const newId = dataDudi.length ? Math.max(...dataDudi.map(s => s.id)) + 1 : 1;
      const newDudi: Dudi = {
         id: newId,
         ...data,
      };

      setDataDudi(prev => [...prev, newDudi]);
      setAddDialogOpen(false);
      resetForm();
   };

   const handleEdit = (dudi: Dudi) => {
      setData({
         nama_perusahaan: dudi.nama_perusahaan,
         alamat: dudi.alamat,
         kuota: dudi.kuota,
         bidang_usaha: dudi.bidang_usaha,
         email: dudi.email,
         telepon: dudi.telepon,
         penanggung_jawab: dudi.penanggung_jawab,
      });
      setEditingId(dudi.id);
      setEditDialogOpen(true);
   };

   const handleUpdate = async () => {
      if (editingId) {
         try {
         const response = await api.put(`/dudi/${editingId}`, {
            ...data,
         })

         if(response.data.status){
            toast.success("Berhasil Mengubah data DUDI");
         }
         const updatedSiswa = dataDudi.map(s => s.id === editingId ? response.data.data : s)
         setDataDudi(updatedSiswa);
         setEditDialogOpen(false);
         setEditingId(null);
         resetForm();
         } catch (error) {
         
         }
         
      }
   };

   const handleDelete = async (id: number) => {
      const res = await api.delete(`/dudi/${id}`)
      if(res.data.status){
         toast.success("Berhasil menghapus data DUDI");
      }else{
         alert(res.data.message);
         return;
      }
      setDataDudi((prev) => prev.filter((k) => k.id !== id));
   };
   return (
      <div className="min-h-screen">
         <div className="max-w-7xl mx-auto space-y-8">
            <PageTitle title="Manajemen Dudi" 
               subTitle="Kelola data industri dan perusahaan mitra magang siswa"
            />

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
               <StatCard title="Total DUDI" value={dudiStat.totalDudi} icon={Building2} subtitle="Perusahaan mitra aktif" />
               <StatCard title="Total Siswa Magang" value={dudiStat.dudiWithMagang} icon={UserIcon} subtitle="Siswa magang aktif" />
               <StatCard title="Rata-rata Siswa" value={dudiStat.rerataSiswaPerDudi} icon={BuildingIcon} subtitle="Per perusahaan" />
            </div>
            <Card className="p-4 shadow text-center">
               <DudiTable
                  addFormFields={addFormField}
                  dataDudi={dataDudi}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  addDialogOpen={addDialogOpen}
                  setAddDialogOpen={setAddDialogOpen}
                  data={data}
                  handleChange={handleChange}
                  handleAdd={handleAdd}
               />
            </Card>
            <EditDudiDialog
            open={editDialogOpen}
            setOpen={setEditDialogOpen}
            data={data}
            handleChange={handleChange}
            handleUpdate={handleUpdate}
            />
            
         </div>
      </div>
   );
}