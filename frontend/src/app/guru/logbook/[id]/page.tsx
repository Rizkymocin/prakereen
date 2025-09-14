"use client"
import { useParams } from "next/navigation";

export default function LogbookDetailPage() {
  const params = useParams<({id: string})>();
  const id = params.id;
  return (
    <div className="text-5xl">Logbook with ID : {id} Detail Page</div>
  )
}