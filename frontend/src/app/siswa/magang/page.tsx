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
  const [myData, setMyData] = useState<Siswa[]>([]);
  
  useEffect(() => {

    if (!user?.id) return;

    const fetchData = async() => {
      const res = await api.get(`/siswa_by_user/${user?.id}`);
      setMyData(res.data.data);     
    } 

    fetchData();
  }, [user?.id])


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
            <p className="font-semibold">{ }</p>
          </div>
          <div>
            <p className="text-gray-500">NIS</p>
            <p className="font-semibold">{}</p>
          </div>

          {/* Kelas & Jurusan */}
          <div>
            <p className="text-gray-500">Kelas</p>
            <p className="font-semibold">XII RPL 1</p>
          </div>
          <div>
            <p className="text-gray-500">Jurusan</p>
            <p className="font-semibold">Rekayasa Perangkat Lunak</p>
          </div>

          {/* Nama Perusahaan & Alamat */}
          <div>
            <p className="text-gray-500 flex items-center gap-1">
              <Building2 className="h-4 w-4" /> Nama Perusahaan
            </p>
            <p className="font-semibold">PT Kreatif Teknologi</p>
          </div>
          <div>
            <p className="text-gray-500">Alamat Perusahaan</p>
            <p className="font-semibold">Jakarta</p>
          </div>

          {/* Periode & Status */}
          <div>
            <p className="text-gray-500 flex items-center gap-1">
              <Calendar className="h-4 w-4" /> Periode Magang
            </p>
            <p className="font-semibold">1 Feb 2024 s.d 1 Mei 2024</p>
          </div>
          <div>
            <p className="text-gray-500">Status</p>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
              Aktif
            </Badge>
          </div>

          {/* Nilai */}
          <div>
            <p className="text-gray-500 flex items-center gap-1">
              <CheckCircle className="h-4 w-4" /> Nilai Akhir
            </p>
            <p className="font-semibold">88</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
