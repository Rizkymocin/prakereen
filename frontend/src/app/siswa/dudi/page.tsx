import PageTitle from "@/app/components/layouts/PageTitle";
import DudiList from "@/app/components/dudi/DudiList";
import React from "react";

export default function SiswaDudiPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <PageTitle title="Cari Tempat Magang" subTitle="Jelajahi perusahaan mitra dan daftarkan diri Anda untuk program magang" />
      
        <DudiList />
      </div>
    </div>
  );
}