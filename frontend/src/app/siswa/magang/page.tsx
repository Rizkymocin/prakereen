"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Building2, Calendar, CheckCircle, UsersIcon } from "lucide-react"
import { useAuthStore } from "@/stores/auth.store";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Siswa } from "@/types";

export default function DataMagangCard() {
  const user = useAuthStore((state) => state.user);
  const [myData, setMyData] = useState<Siswa | null>(null);
  
  useEffect(() => {

    if (!user?.id) return;

    const fetchData = async() => {
      const res = await api.get(`/siswa_by_user/${user?.id}`);
      setMyData(res.data.data);     
    } 

    fetchData();
  }, [user?.id])
  
  const magangAktif = (myData?.magang ?? []).find(m => m.status === "aktif");

  return (
    <Card className="w-full shadow-md rounded-xl">
      <CardHeader className="flex flex-row items-center gap-2 pb-4">
        <UsersIcon className="h-5 w-5 text-cyan-600" />
        <CardTitle className="text-lg">Data Magang</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-y-10 gap-x-8 text-md">
          {/* Nama & NIS */}
          <div>
            <p className="text-gray-500">Nama Siswa</p>
            <p className="font-semibold">{myData?.nama}</p>
          </div>
          <div>
            <p className="text-gray-500">NIS</p>
            <p className="font-semibold">{myData?.nis}</p>
          </div>

          {/* Kelas & Jurusan */}
          <div>
            <p className="text-gray-500">Kelas</p>
            <p className="font-semibold">{myData?.kelas.tingkat} {myData?.kelas.jurusan.jurusan} {myData?.kelas.rombel}</p>
          </div>
          <div>
            <p className="text-gray-500">Jurusan</p>
            <p className="font-semibold">{myData?.kelas.jurusan.jurusan}</p>
          </div>
        </div>


          {/* Nama Perusahaan & Alamat */}
          {magangAktif ? (
            <div className="grid grid-cols-2 gap-y-10 gap-x-8 text-md mt-10">
              <div>
                <p className="text-gray-500 flex items-center gap-1">
                  <Building2 className="h-4 w-4" /> Nama Perusahaan
                </p>
                <p className="font-semibold">
                  {magangAktif.dudi.nama_perusahaan}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Alamat Perusahaan</p>
                <p className="font-semibold">{magangAktif.dudi.alamat}</p>
              </div>
              
              <div>
                <p className="text-gray-500 flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> Periode Magang
                </p>
                <p className="font-semibold">{magangAktif.periode_mulai} s.d {magangAktif.periode_selesai}</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  Aktif
                </Badge>
              </div>

              
              <div>
                <p className="text-gray-500 flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" /> Nilai Akhir
                </p>
                <p className="font-semibold">{magangAktif.nilai}</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-y-10 gap-x-8 text-md">
              <p className="text-center text-2xl text-red-400 font-bold">Belum ada data magang yang aktif</p>
            </div>
          )}
      </CardContent>
    </Card>
  )
}
