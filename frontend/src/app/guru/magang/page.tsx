import PageTitle from "@/app/components/layouts/PageTitle";

export default function MagangPage() {
   return (
      <div className="min-h-screen">
         <div className="max-w-7xl mx-auto space-y-8">
            <PageTitle title="Manajemen Siswa Magang" 
               subTitle="Kelola data siswa yang sedang melaksanakan magang di industri" />
         </div>
      </div>
   );
}