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
import { Book } from "../types/types";
import { DialogDescription } from "@radix-ui/react-dialog";
import { NextResponse } from "next/server";
import { Checkbox } from "../ui/checkbox";
import { bookSchema } from "../add-book/schema";

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
    detail: book.detail,
    available: book.available,
  });
  const [validationErrors, setValidationErrors] = useState('')
  const [nameErrors, setNameErrors] = useState<string[]>([])
  const [descriptionErrors, setDescriptionErrors] = useState<string[]>([])
  const [authorErrors, setAuthorErrors] = useState<string[]>([])
  const [detailErrors, setDetailErrors] = useState<string[]>([])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async () => {
    setNameErrors([])
    setDescriptionErrors([])
    setAuthorErrors([])
    setDetailErrors([])
    const validation = bookSchema.safeParse(formData)
    if (!validation.success) {
      const issues = validation.error.issues

      const nameErrs: string[] = []
      const descErrs: string[] = []
      const authorErrs: string[] = []
      const detailErrs: string[] = []

      issues.forEach((issue) => {
        const field = issue.path[0]
        if (field === 'name') nameErrs.push(issue.message)
        if (field === 'description') descErrs.push(issue.message)
        if (field === 'author') authorErrs.push(issue.message)
        if (field === 'detail') detailErrs.push(issue.message)
      })

      setNameErrors(nameErrs)
      setDescriptionErrors(descErrs)
      setAuthorErrors(authorErrs)
      setDetailErrors(detailErrs)
      return
    }
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
        return NextResponse.json({ err, status: 500 });
      }

      onConfirm();
      setOpen(false);
    } catch (err) {
      return NextResponse.json({ err, status: 500 })
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="mx-2 rounded-lg size-8 bg-blue-300">
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
              className="border border-black rounded px-2" />
            {nameErrors[0] && (
              <p className="text-xs text-red-600 ml-1">{nameErrors[0]}</p>
            )}
          </div>
          <div className="grid gap-3">
            <label htmlFor="description">Description</label>
            <input
              onChange={handleChange}
              id="description"
              name="description"
              value={formData.description}
              className="border border-black rounded px-2" />
            {descriptionErrors[0] && (
              <p className="text-xs text-red-600 ml-1">{descriptionErrors[0]}</p>
            )}
          </div>
          <div className="grid gap-3">
            <label htmlFor="author">Author Name</label>
            <input
              onChange={handleChange}
              id="author"
              name="author"
              value={formData.author}
              className="border border-black rounded px-2" />
            {authorErrors[0] && (
              <p className="text-xs text-red-600 ml-1">{authorErrors[0]}</p>
            )}
          </div>
          <div className="grid gap-3">
            <label htmlFor="description">About book</label>
            <textarea
              onChange={handleChange}
              id="detail"
              name="detail"
              value={formData.detail}
              rows={3}
              className="border border-black rounded px-2" />
            {detailErrors[0] && (
              <p className="text-xs text-red-600 ml-1">{detailErrors[0]}</p>
            )}
          </div>
          <div>
            <Checkbox
              checked={formData.available}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  available: Boolean(checked),
                }))
              }
              className="border border-black mr-2" />
            <label>Is this book available</label>
          </div>

        </div>
        <div>
          {validationErrors && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 border border-red-300 rounded-md space-y-1">
              {validationErrors}
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between pt-4">
          <button
            type="submit"
            onClick={submitForm}
            className="bg-blue-500 px-4 py-2 text-white rounded hover:bg-blue-400">
            Update Changes
          </button>
          <button
            onClick={() => setOpen(false)}
            className="bg-black px-4 py-2 text-white rounded hover:bg-gray-700">
            Cancel
          </button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}
