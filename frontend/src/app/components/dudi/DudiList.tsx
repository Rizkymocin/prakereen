"use client";

import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Eye, MapPin, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { api } from "@/lib/api";
import DaftarDudiButton from "@/app/components/dudi/DaftarDudiButton";
import { DataMagang, Siswa, Dudi } from "@/types";
import { toast } from "sonner";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

type Company = {
  id: number;
  nama_perusahaan: string;
  bidang_usaha: string;
  alamat: string;
  penanggung_jawab: string;
  magang?: DataMagang[];
  kuota: number ;
  terisi: number;
  deskripsi: string;
  status?: "menunggu" | "sudah" | "bisa daftar";
};

export default function CompanyList() {
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [magangSiswa, setMagangSiswa] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [dudiResponse, magangSiswaResponse] = await Promise.all([
        api.get("/dudi"),
        api.get("siswa/magang")
      ])
      setCompanies(dudiResponse.data.data.dudi);  
      setMagangSiswa(magangSiswaResponse.data.data); 
    };
    fetchData();
  }, []);
  
  console.log(companies);
  
  // Filter
  const filteredCompanies = useMemo(() => {
    return companies.filter(
      (c) =>
        c.nama_perusahaan.toLowerCase().includes(search.toLowerCase()) ||
        c.bidang_usaha.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, companies]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);
  
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(start + itemsPerPage - 1, filteredCompanies.length);

  const renderButton = (dudi: Company) => {
    // cari magang siswa untuk company ini
    const myMagang = magangSiswa.find((m) => m.dudi_id === dudi.id);

    // cek apakah ada magang aktif
    const hasActiveMagang = magangSiswa.some((m) => m.status === "aktif");

    // 1. Belum mendaftar sama sekali
    if (magangSiswa.length === 0) {
      if ((dudi.magang ?? []).length >= dudi.kuota) {
        return (
          <Button
            disabled
            size="sm"
            variant="secondary"
            className="text-xs flex-1 bg-red-500 text-white"
          >
            Kuota Penuh
          </Button>
        );
      }
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button disabled={loading} variant="default" className="cursor-pointer text-xs flex-1 bg-gradient-to-r from-cyan-500 to-sky-600"><Send /> Daftar</Button>
          </DialogTrigger>
          
          <DaftarDudiButton companyId={dudi.id.toString()} onDaftar={handleDaftar} />
        </Dialog>
        // <Button
        //   size="sm"
        //   className="cursor-pointer text-xs flex-1 bg-gradient-to-r from-cyan-500 to-sky-600"
        // >
        //   <Send className="h-4 w-4 mr-1" />
        //   Daftar
        // </Button>
      );
    }

    // 2. Sudah mendaftar di company ini
    if (myMagang) {
      const myMagangAktif = magangSiswa.find((m) => m.dudi_id === dudi.id && m.status === "aktif");
      if(myMagangAktif){
        return (
            <Button
            disabled
            size="sm"
            variant="default"
            className="cursor-progress text-xs flex-1 bg-gradient-to-r from-green-500 to-teal-600"
          >
            Sudah Diterima di DUDI ini
          </Button>
        )
      }else{
        return (
          <Button
            disabled
            size="sm"
            variant="secondary"
            className="cursor-progress text-xs flex-1 bg-gradient-to-r from-cyan-500 to-sky-600"
          >
            Sudah Mendaftar
          </Button>
        );
      }
      // const myMagang = magangSiswa.find((m) => m.dudi_id === dudi.id);
      
    }

    // 3. Kalau ada magang aktif di company lain → semua company lain disable
    if (hasActiveMagang) {
      return 
      (
        <Button
          disabled
          size="sm"
          variant="secondary"
          className="text-xs flex-1 bg-gray-400 cursor-not-allowed"
        >
          Sedang menjalani Magang
        </Button>
      );
    }

    // 4. Kalau hanya pending di company lain → masih bisa daftar di sini
    if ((dudi.magang ?? []).length >= dudi.kuota) {
      return (
        <Button
          disabled
          size="sm"
          variant="secondary"
          className="text-xs flex-1 bg-red-500 text-white"
        >
          Kuota Penuh
        </Button>
      );
    }
    return (
      <Dialog>
      <DialogTrigger asChild>
        <Button disabled={loading} variant="default" className="cursor-pointer text-xs flex-1 bg-gradient-to-r from-cyan-500 to-sky-600"><Send /> Daftar</Button>
      </DialogTrigger>
      
      <DaftarDudiButton companyId={dudi.id.toString()} onDaftar={handleDaftar} />
      </Dialog>
    );
  };

  const handleDaftar = async (company_id: string) => {
    setLoading(true);
    const res = await api.post('/siswa/daftar-dudi', {company_id});
    if(res.status){
      toast.success("Telah Berhasil Mendaftar di DUDI");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }


  }

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Search + Items Per Page */}
      <Card>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Input
              placeholder="Cari perusahaan, bidang..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // reset ke page 1 kalau ada pencarian
              }}
              className="md:w-1/3"
            />

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Tampilkan:</span>
              <Select
                value={String(itemsPerPage)}
                onValueChange={(val) => {
                  setItemsPerPage(Number(val));
                  setCurrentPage(1); // reset ke page 1 kalau ganti jumlah item
                }}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="9">9</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">per halaman</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedCompanies.map((c) => (
          <Card key={c.id} className="p-4 space-y-3">
            <CardContent className="space-y-3 p-0">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-linear-to-r from-cyan-500 to-sky-600 flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-sm">{c.nama_perusahaan}</h2>
                  <p className="text-xs font-semibold text-cyan-600">{c.bidang_usaha}</p>
                </div>
              </div>

              {/* Info */}
              <div className="text-xs space-y-1 text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {c.alamat}
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" /> PIC: {c.penanggung_jawab}
                </div>
              </div>

              {/* Kuota */}
              <div className="p-2 rounded-sm bg-gray-50">
                <div className="flex justify-between text-xs mb-1">
                  <span>Kuota Magang</span>
                  <span className="font-medium">
                    {(c.magang ?? []).filter(m => m.status === "aktif").length}/{c.kuota}
                  </span>
                </div>
                <Progress className="bg-gray-200 [&>div]:bg-gradient-to-r [&>div]:from-cyan-500 [&>div]:to-sky-600" value={((c.magang ?? []).filter(m => m.status === "aktif").length / c.kuota) * 100} />
                <p className="text-xs text-slate-500 mt-1">
                  {c.kuota - (c.magang ?? []).filter(m => m.status === "aktif").length} slot tersisa
                </p>
              </div>

              {/* Deskripsi */}
              <p className="text-xs mt-3 p-2 rounded-sm bg-gray-50 text-slate-600 line-clamp-3">{c.deskripsi}</p>

              {/* Actions */}
              <div className="flex justify-evenly items-center gap-2">
                <Button variant="ghost" size="sm" className="flex-1 text-xs">
                  <Eye className="h-4 w-4"/>
                  Detail
                </Button>
                {renderButton(c)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      <Card>
        <CardContent>
          <div className="flex justify-between items-center gap-2">
            <div>
              Menampilkan {start} sampai {end} dari {filteredCompanies.length}
            </div>
            <div>
              <Button
                variant="ghost"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <ChevronLeft />
              </Button>

              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  size="sm"
                  variant={currentPage === i + 1 ? "outline" : "ghost"}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                variant="ghost"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                <ChevronRight className="cursor-pointer" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
    </div>
  );
}
