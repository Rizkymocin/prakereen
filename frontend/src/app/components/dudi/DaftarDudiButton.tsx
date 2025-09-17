import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Send } from "lucide-react";

interface DaftarDudiButtonProps {
  companyId: string;
  onDaftar: (company_id: string) => void;
}

export default function DaftarDudiButton({companyId, onDaftar} : DaftarDudiButtonProps){
  return (
      <DialogContent className="w-full max-w-[min(90vw,300px)]">
      <DialogHeader>
        <DialogTitle>Yakin mendaftar di DUDI ini?</DialogTitle>
        <DialogDescription>
            Tindakan ini tidak bisa dibatalkan.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="flex justify-end gap-2">
        <DialogClose asChild>
            <Button variant="outline">Batal</Button>
        </DialogClose>
        <DialogClose asChild>
            <Button variant="default" onClick={() => onDaftar(companyId)}>
            Ya, Daftar
            </Button>
        </DialogClose>
      </DialogFooter>
      </DialogContent>
  )
}