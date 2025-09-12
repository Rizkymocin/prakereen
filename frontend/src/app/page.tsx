'use client'

import { redirect } from "next/navigation";
import PageTitle from "@/app/components/layouts/PageTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Phone } from "lucide-react";
import { Users, BookOpen, Building2, GraduationCap, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { DataMagang,DataLogbook } from "@/types";
import { useAuthStore } from "@/stores/auth.store";
import { StatCard } from "@/app/components/dashboard/StatCard";

export default function Home() {
  const [totalSiswa, setTotalSiswa] = useState(0);
  const [totalDudi, setTotalDudi] = useState(0);
  const [totalSiswaMagang, setTotalSiswaMagang] = useState(0)
  const [totalLogbook, setTotalLogbook] = useState(0)
  const [recentMagang, setRecentMagang] = useState<DataMagang[]>([]);
  const [recentLogbook, setRecentLogbook] = useState<DataLogbook[]>([]);
  const [activeDudi, setActiveDudi] = useState<any[]>([]) 
  const [siswaAktifMagang, setSiswaAktifMagang] = useState<number>(0)
  const [logbookToday, setLogbookToday] = useState<number>(0)// Sesuaikan tipe data jika perlu
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/dashboard')
        if(res.status === 200) {
          const data = res.data;          
          setTotalSiswa(data.totalSiswa);
          setTotalDudi(data.totalDudi);
          setTotalSiswaMagang(data.magangInProgress);
          setTotalLogbook(data.totalLogbook);
          setRecentMagang(data.recentMagang);
          setRecentLogbook(data.recentLogbook);
          setActiveDudi(data.activeDudi); 
          setSiswaAktifMagang(data.siswaAktifMagang);
          setLogbookToday(data.logbookToday);// Pastikan data ini sesuai dengan respons dari backend
        } else {
          // Jika token tidak valid atau ada error, redirect ke halaman login
          // redirect("/login");
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
        // redirect("/login");
      }
    }

    fetchStats();
  }, []);

  if(user?.role_names?.includes('siswa')) {
    redirect('/siswa');
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <PageTitle 
          title="Dashboard" 
          subTitle="Selamat datang di sistem pelaporan magang SMK Negeri 1 Limboto" 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Siswa" value={totalSiswa} icon={Users} subtitle="Seluruh siswa terdaftar" />
          <StatCard title="DUDI Partner" value={totalDudi} icon={Building2} subtitle="Perusahaan mitra" />
          <StatCard title="Siswa Magang" value={totalSiswaMagang} icon={GraduationCap} subtitle="Sedang aktif magang" />
          <StatCard title="Total Logbook" value={totalLogbook} icon={BookOpen} subtitle="Seluruh laporan yang masuk" />
        </div>
      </div>

      <div className="grid grid-cols-1 mt-8 lg:grid-cols-3 gap-6">
        {/* KIRI */}
        <div className="lg:col-span-2 space-y-6">
          {/* Magang Terbaru */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-sky-600" />
                Magang Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Item magang */}
              {recentMagang.map((magang, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl border">
                <div>
                  <p className="font-semibold">{magang.siswa.nama}</p>
                  <p className="text-sm text-muted-foreground">{magang.dudi.nama_perusahaan}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> {magang.periode_mulai} - {magang.periode_selesai}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className={
                    magang.status === "pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : magang.status === "aktif"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-600"
                  }
                >
                  {magang.status.charAt(0).toUpperCase() + magang.status.slice(1)}
                </Badge>
              </div>
              ))}
            </CardContent>
          </Card>

          {/* Logbook Terbaru */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-green-600" />
                Logbook Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            {recentLogbook.map((logbook, index) => (
              <div key={index} className="p-3 rounded-xl border">
                <p className="font-medium">{logbook.kegiatan}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <Calendar className="h-4 w-4" /> {logbook.tanggal}
                </p>
                <p className="text-xs italic text-orange-500 mt-1">
                  Kendala : {logbook.kendala}
                </p>
                <Badge
                  variant="secondary"
                  className={
                    logbook.status_verifikasi === "pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : logbook.status_verifikasi === "aktif"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-600"
                  }
                >
                  {logbook.status_verifikasi.charAt(0).toUpperCase() + logbook.status_verifikasi.slice(1)}
                </Badge>
              </div>
            ))}
            </CardContent>
          </Card>
        </div>

        {/* KANAN */}
        <div className="space-y-6">
          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Progress Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Siswa Aktif Magang</p>
                <Progress value={siswaAktifMagang * (100/totalSiswa)} className="h-2 [&>div]:bg-sky-600" />
                <p className="text-xs text-muted-foreground mt-1">{siswaAktifMagang * (100/totalSiswa)}%</p>
              </div>
              <div>
                <p className="text-sm font-medium">Logbook Hari Ini</p>
                <Progress value={logbookToday * (100/totalLogbook)} className="h-2 [&>div]:bg-sky-600" />
                <p className="text-xs text-muted-foreground mt-1">{(logbookToday * (100/totalLogbook)).toFixed(2)}%</p>
              </div>
            </CardContent>
          </Card>

          {/* DUDI Aktif */}
          <Card>
            <CardHeader>
              <CardTitle>DUDI Aktif</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            {activeDudi.map((data, index) => (
              <div key={index}>
                <p className="font-semibold">{data.nama_perusahaan}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Building2 className="h-4 w-4" /> {data.alamat}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Phone className="h-4 w-4" /> {data.telepon}
                </p>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 mt-1">{data.total_siswa_aktif} siswa</Badge>
              </div>
            ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


