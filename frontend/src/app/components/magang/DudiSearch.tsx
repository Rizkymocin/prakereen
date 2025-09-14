"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { Dudi, Siswa } from '@/types';
import { api } from "@/lib/api"

export default function StudentSearch({
   dataDudi, 
   onSelect, 
   defaultDudi
}:{
   dataDudi: Dudi[], 
   onSelect: (id:number) => void, 
   defaultDudi?: Dudi | null
}) {
   
   const [dudi, setDudi ] = useState<Dudi[]>([]);

   const [query, setQuery] = useState("")
   const [filtered, setFiltered] = useState<typeof dudi>([])
   const [selectedDudi, setSelectedDudi] = useState<null | typeof dudi[0]>(null)

   // isi default student untuk edit
   useEffect(() => {
      if (defaultDudi) {
         setSelectedDudi(defaultDudi);
         setQuery(defaultDudi.nama_perusahaan);
         onSelect(defaultDudi.id);
      }
   }, [defaultDudi]);
  // filter data berdasarkan input
   useEffect(() => {
      if (query.trim() === "") {
         setFiltered([])
      } else {
         setFiltered(
         dudi.filter((s) =>
            s.nama_perusahaan.toLowerCase().includes(query.toLowerCase())
         )
         )
      }
   }, [query])

   useEffect(() => {
      setDudi(dataDudi);
   }, [dataDudi]);

   if(!dudi) return <>Loading...</>

   const handleSelect = (perusahaan: typeof dudi[0]) => {
      setSelectedDudi(perusahaan);
      setQuery(perusahaan.nama_perusahaan); // isi input pencarian dengan nama
      setFiltered([]); // tutup list setelah pilih

      onSelect(perusahaan.id);
   }

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value)
      // setiap kali user edit teks → hapus data siswa terpilih
      setSelectedDudi(null)
   }

   return (
      <div className="space-y-4 w-full">
         {/* Input pencarian */}
         <div className="relative">
         <Input
            placeholder="Ketikkan nama Mitra DUDI..."
            value={query}
            onChange={handleChange}
         />

         {/* List hasil pencarian */}
         {filtered.length > 0 && (
            <Card className="absolute z-10 mt-1 w-full max-h-51 overflow-y-auto border rounded-md shadow-lg p-0">
               <div className="divide-y">
                  {filtered.map((dudi) => (
                     <div
                     key={dudi.id}
                     onClick={() => {
                           handleSelect(dudi)
                        }
                     }
                     className="cursor-pointer px-2 py-2 hover:bg-accent hover:text-accent-foreground"
                     >
                     <div className="text-md font-semibold">{dudi.nama_perusahaan}</div>
                     <div className="text-xs">{dudi.alamat}</div>
                     </div>
                  ))}
               </div>
            </Card>

         )}
         </div>

         {/* Input otomatis terisi */}
         <Input
         placeholder="Telepon"
         value={selectedDudi?.telepon || ""}
         readOnly
         />
         <Input
         placeholder="Penanggung Jawab"
         value={
                  selectedDudi?.penanggung_jawab || ""
               }
         readOnly
         />
      </div>
   )
   }
