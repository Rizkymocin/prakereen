   import {
      DialogContent,
      DialogDescription,
      DialogFooter,
      DialogHeader,
      DialogTitle,
      DialogClose,
   } from "@/components/ui/dialog";
   import { Button } from "@/components/ui/button";

   interface ConfirmDeleteDialogProps {
      onConfirm: () => void;
   }

   export default function ConfirmDeleteDialog({ onConfirm }: ConfirmDeleteDialogProps) {
      return (
         <DialogContent className="w-full max-w-[min(90vw,300px)]">
         <DialogHeader>
            <DialogTitle>Logout</DialogTitle>
            <DialogDescription>
               Anda akan keluar dari aplikasi. Lanjutkan?
            </DialogDescription>
         </DialogHeader>
         <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
               <Button variant="outline">Batal</Button>
            </DialogClose>
            <DialogClose asChild>
               <Button variant="destructive" onClick={onConfirm}>
               Ya, Lanjutkan
               </Button>
            </DialogClose>
         </DialogFooter>
         </DialogContent>
      );
   }
