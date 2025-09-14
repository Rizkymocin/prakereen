"use client";

import { StatCard } from "@/app/components/dashboard/StatCard";
import PageTitle from "@/app/components/layouts/PageTitle";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { DataLogbook } from "@/types";
import { Building2, BuildingIcon, UserIcon } from "lucide-react";
import LogbookTable from "@/app/components/logbook/LogbookTable";


export default function LogbookPage() {
   const [logbookStat, setLogbookStat] = useState({
      totalLogbook: 0,
      totalVerified: 0,
      totalPending: 0,
      totalRejected: 0
   })
   const [data, setData] = useState({} as Partial<DataLogbook>);
   const [dataLogbook, setDataLogbook] = useState<DataLogbook[]>([]);
   const [addDialogOpen, setAddDialogOpen] = useState(false);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await api.get('/logbook');
            setLogbookStat(response.data.data.stat);
            setDataLogbook(response.data.data.logbooks);
         } catch (error) {
            console.error('Error fetching data:', error);
         } 
      }
      fetchData();
   }, []);
   
   return (
      <div className="min-h-screen">
         <div className="max-w-7xl mx-auto space-y-8">
            <PageTitle title="Manajemen Logbook Magang" 
               subTitle="Kelola dan verifikasi laporan harian kegiatan siswa magang" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <StatCard title="Total Logbook" value={logbookStat.totalLogbook} icon={Building2} subtitle="Laporan harian terdaftar" />
               <StatCard title="Belum Diverifikasi" value={logbookStat.totalVerified} icon={UserIcon} themeColor="text-orange-500" subtitle="Menunggu verifikasi" />
               <StatCard title="Disetujui" value={logbookStat.totalPending} icon={BuildingIcon} themeColor="text-green-700" subtitle="Sudah diverifikasi" />
               <StatCard title="Ditolak" value={logbookStat.totalPending} icon={BuildingIcon} themeColor="text-red-500" subtitle="Perlu perbaikan" />
            </div>
            <Card className="p-4 shadow text-center">
               <LogbookTable
                  dataLogbook={dataLogbook}
                  handleEdit={() => {}}
                  handleDelete={() => {}}
                  addDialogOpen={addDialogOpen}
                  setAddDialogOpen={setAddDialogOpen}
                  data={data}
                  handleChange={() => {}}
                  handleAdd={() => {}}
               />
            </Card>
         </div>
      </div>
   );
}