"use client";

import { StatCard } from "@/app/components/dashboard/StatCard";
import PageTitle from "@/app/components/layouts/PageTitle";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/api";
import { DataMagang, Siswa } from "@/types";
import { Calendar, CheckCircle, GraduationCap, Users } from "lucide-react";
import { useEffect, useState } from "react";
import MagangTable from "@/app/components/magang/MagangTable";
import EditMagangDialog from "@/app/components/magang/EditMagangDialog";
import { toast } from "sonner";
import { FieldConfig } from "@/app/components/layouts/DynamicFormFields";
import getEmptyFields from "@/lib/getEmptyFields";

export default function MagangPage() {
   const [dataMagang, setDataMagang] = useState<DataMagang[]>([]);
   const [data, setData] = useState({
         siswa: {} as any, dudi: {} as any, guru: {} as any, periode_mulai: "", periode_selesai: "", status: ""
      });
   const [siswa, setSiswa] = useState<Siswa[]>([]);
   const [dudi, setDudi] = useState<any[]>([]);
   const [magangStat, setMagangStat] = useState({
      totalSiswa: 0,
      totalAktifMagang: 0,
      totalSelesaiMagang: 0,
      totalPendingMagang: 0
   })

   const [editingId, setEditingId] = useState<number | null>(null);
   const [editDialogOpen, setEditDialogOpen] = useState(false);
   const [addDialogOpen, setAddDialogOpen] = useState(false);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const [siswaResponse, dudiResponse] = await Promise.all([
               api.get('/siswa'),
               api.get('/dudi')
            ]);

            console.log(siswaResponse, dudiResponse);
            
            setSiswa(siswaResponse.data.data);
            setDudi(dudiResponse.data.data.dudi);

            const response = await api.get('/magang');
            setMagangStat(response.data.data.stat);
            setDataMagang(response.data.data.magang);
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      }

      fetchData();
   }, []);

   
   const handleChange = (key: string, value: string | number) =>
      setData((prev) => ({ ...prev, [key]: value }));

   const resetForm = () =>
      setData({ siswa: "", dudi: "", guru: "", periode_mulai: "", periode_selesai: "", status: "" });

   const addFormFields: FieldConfig[] = [
      { key: 'periode_mulai', label: 'Periode Mulai', type: 'date', placeholder: 'Masukkan nama perusahaan', required: true },
      { key: 'periode_selesai', label: 'Periode Selesai', type: 'date', placeholder: 'Masukkan alamat perusahaan', required: true }, 
   ]
   const handleAdd = async () => {    
      const empty = getEmptyFields(data, addFormFields)

      if(empty.length > 0){
         toast.error("Field ini perlu disii : " + empty.join(", "));
         return;
      }  
      const res = await api.post('/magang', {
         ...data,
      });

      if(res.data.status){
         toast.success(res.data.message);

         setTimeout(() => {
         window.location.reload();
         }, 1500);
      }

      const newId = dataMagang.length ? Math.max(...dataMagang.map(s => s.id)) + 1 : 1;
      const newMagang: DataMagang = {
         id: newId,
         ...data,
      };

      setDataMagang(prev => [...prev, newMagang]);
      setAddDialogOpen(false);
      resetForm();
   };

   const handleEdit = (magang: DataMagang) => {
      setData({
         siswa: magang.siswa,
         dudi: magang.dudi,
         guru: magang.guru,
         periode_mulai: magang.periode_mulai,
         periode_selesai: magang.periode_selesai,
         status: magang.status,
      });
      setEditingId(magang.id);
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
         const updatedMagang = dataMagang.map(s => s.id === editingId ? response.data.data : s)
         setDataMagang(updatedMagang);
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
      setDataMagang((prev) => prev.filter((k) => k.id !== id));
   };

   return (
      <div className="min-h-screen">
         <div className="max-w-7xl mx-auto space-y-8">
            <PageTitle title="Manajemen Siswa Magang" 
               subTitle="Kelola data siswa yang sedang melaksanakan magang di industri" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <StatCard title="Total Siswa" value={magangStat.totalSiswa} icon={Users} subtitle="Siswa magang terdaftar" />
               <StatCard title="Aktif" value={magangStat.totalAktifMagang} themeColor="text-green-700" icon={GraduationCap} subtitle="Sedang magang" />
               <StatCard title="Selesai" value={magangStat.totalSelesaiMagang} themeColor="text-blue-700" icon={CheckCircle} subtitle="Magang selesai" />
               <StatCard title="Pending" value={magangStat.totalPendingMagang} themeColor="text-orange-700" icon={Calendar} subtitle="Menunggu Penempatan" />
            </div>

            <Card className="p-4 shadow text-center">
               <MagangTable
                  addFormFields={addFormFields}
                  dataMagang={dataMagang}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  addDialogOpen={addDialogOpen}
                  setAddDialogOpen={setAddDialogOpen}
                  data={data}
                  handleChange={handleChange}
                  handleAdd={handleAdd}
               />
            </Card>
            <EditMagangDialog
            open={editDialogOpen}
            setOpen={setEditDialogOpen}
            data={data}
            allSiswa={siswa}
            allDudi={dudi}
            handleChange={handleChange}
            handleUpdate={handleUpdate}
            />
         </div>
      </div>
   );
}