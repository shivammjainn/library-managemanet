import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Eye } from "lucide-react"
import { Book } from "../types/types";
import { useState } from "react";
type DetailModalProps={
  book:Book;
}
export default function DetailModal({book}:DetailModalProps) {
  const [open,setOpen]=useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button size="icon" variant="secondary" className="mx-1 rounded-lg size-8 border border-black bg-white text-black">
            
            <Eye />
            
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-gray-400 mb-6">Book Detail</DialogTitle>
            <DialogDescription className="text-black">
             {book.detail}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
            </div>
            <div className="grid gap-3">
            </div>
          </div>
          <DialogFooter>
              <Button onClick={()=>setOpen(false)} variant="outline">Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
