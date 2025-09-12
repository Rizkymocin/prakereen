import PageTitle from "@/app/components/layouts/PageTitle";

export default function LogbookPage() {
   return (
      <div className="min-h-screen">
         <div className="max-w-7xl mx-auto space-y-8">
            <PageTitle title="Manajemen Logbook Magang" 
               subTitle="Kelola dan verifikasi laporan harian kegiatan siswa magang" />
         </div>
      </div>
   );
}