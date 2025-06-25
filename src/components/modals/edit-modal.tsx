"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { useState } from "react";
import { Book } from "../types/types"; // adjust path
import { DialogDescription } from "@radix-ui/react-dialog";
import { NextResponse } from "next/server";

type EditModalProps = {
  book: Book;
  onConfirm: () => void;
};

export default function EditModal({ book, onConfirm }: EditModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: book.book_name,
    description: book.description,
    author: book.book_author,
    detail:book.detail,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async () => {
    try {
      const res = await fetch(`/api/update-book?id=${book.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        return NextResponse.json({err,status:500});
      }

      onConfirm(); 
      setOpen(false);
    } catch (err) {
      return NextResponse.json({err,status:500})
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="mx-2 rounded-lg size-8 bg-blue-500"
        >
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Book Details</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <label htmlFor="name">Book Name</label>
            <input
              onChange={handleChange}
              id="name"
              name="name"
              value={formData.name}
              className="border border-black rounded px-2"
            />
          </div>
          <div className="grid gap-3">
            <label htmlFor="description">Description</label>
            <input
              onChange={handleChange}
              id="description"
              name="description"
              value={formData.description}
              className="border border-black rounded px-2"
            />
          </div>
          <div className="grid gap-3">
            <label htmlFor="author">Author Name</label>
            <input
              onChange={handleChange}
              id="author"
              name="author"
              value={formData.author}
              className="border border-black rounded px-2"
            />
          </div>
          <div className="grid gap-3">
            <label htmlFor="description">About book</label>
            <input
              onChange={handleChange}
              id="detail"
              name="detail"
              value={formData.detail}
              className="border border-black rounded px-2"
            />
          </div>
        </div>
        <DialogFooter className="flex justify-between pt-4">
          <button
            onClick={submitForm}
            className="bg-blue-500 px-4 py-2 text-white rounded hover:bg-blue-400"
          >
            Update Changes
          </button>
          <button
            onClick={() => setOpen(false)}
            className="bg-black px-4 py-2 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
