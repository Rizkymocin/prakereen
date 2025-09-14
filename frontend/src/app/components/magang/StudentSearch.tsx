"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { Siswa } from '@/types';
import { api } from "@/lib/api"
import { on } from "events"

export default function StudentSearch({
   dataSiswa, 
   onSelect, 
   defaultSiswa
}:{dataSiswa: Siswa[], 
   onSelect: (id:number) => void, 
   defaultSiswa?: Siswa | null
}) {
   const [siswa, setSiswa ] = useState<Siswa[]>([]);

   const [query, setQuery] = useState("")
   const [filtered, setFiltered] = useState<typeof siswa>([])
   const [selectedStudent, setSelectedStudent] = useState<null | typeof siswa[0]>(null)

   // isi default student untuk edit
   useEffect(() => {
      if (defaultSiswa) {
         setSelectedStudent(defaultSiswa);
         setQuery(defaultSiswa.nama);
         onSelect(defaultSiswa.id);
      }
   }, [defaultSiswa]);

   // filter data berdasarkan input
   useEffect(() => {
      if (query.trim() === "") {
         setFiltered([])
      } else {
         setFiltered(
         siswa.filter((s) =>
            s.nama.toLowerCase().includes(query.toLowerCase())
         )
         )
      }
   }, [query])

   useEffect(() => {
      setSiswa(dataSiswa);
   }, [dataSiswa]);

   if(!siswa) return <>Loading...</>

   const handleSelect = (student: typeof siswa[0]) => {
      setSelectedStudent(student);
      setQuery(student.nama); // isi input pencarian dengan nama
      setFiltered([]); // tutup list setelah pilih

      onSelect(student.id);
   }

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value)
      // setiap kali user edit teks → hapus data siswa terpilih
      setSelectedStudent(null)
   }

   return (
      <div className="space-y-4 w-full">
         {/* Input pencarian */}
         <div className="relative">
         <Input
            placeholder="Ketikkan nama siswa..."
            value={query}
            onChange={handleChange}
         />

         {/* List hasil pencarian */}
         {filtered.length > 0 && (
            <Card className="absolute z-10 mt-1 w-full max-h-51 overflow-y-auto border rounded-md shadow-lg p-0">
               <div className="divide-y">
                  {filtered.map((siswa) => (
                     <div
                     key={siswa.id}
                     onClick={() => {
                           handleSelect(siswa)
                        }
                     }
                     className="cursor-pointer px-2 py-2 hover:bg-accent hover:text-accent-foreground"
                     >
                     <div className="text-md font-semibold">{siswa.id} - {siswa.nama}</div>
                     <div className="text-xs">NIS: {siswa.nis} - Kelas: {siswa.kelas.tingkat} {siswa.kelas.jurusan.jurusan} {siswa.kelas.rombel}</div>
                     </div>
                  ))}
               </div>
            </Card>

         )}
         </div>

         {/* Input otomatis terisi */}
         <Input
         placeholder="NISN"
         value={selectedStudent?.nis || ""}
         readOnly
         />
         <Input
         placeholder="Kelas"
         value={
                  selectedStudent ?
                  selectedStudent.kelas.tingkat + " " +
                  selectedStudent.kelas.jurusan.jurusan + " " +
                  selectedStudent.kelas.rombel
                  : ""
               }
         readOnly
         />
      </div>
   )
   }
