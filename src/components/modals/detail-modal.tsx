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
  <DialogTrigger asChild>
    <Button
      size="icon"
      variant="secondary"
      className="mx-1 rounded-lg size-8 border border-black bg-white text-black"
    >
      <Eye />
    </Button>
  </DialogTrigger>

  <DialogContent className="sm:max-w-[600px] p-6 rounded-xl shadow-lg">
    <DialogHeader>
      <DialogTitle className="text-xl font-semibold text-gray-700 mb-4">📖 Book Details</DialogTitle>
      <DialogDescription className="text-base text-gray-600 leading-relaxed">
        {book.detail}
      </DialogDescription>
    </DialogHeader>

    <div className="grid gap-6">
    </div>

    <DialogFooter className="mt-6">
      <Button onClick={() => setOpen(false)} variant="outline" className="rounded-md">
        Close
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

  )
}
