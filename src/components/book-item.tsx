"use client";

import React from "react";
import { BookItemProps } from "./types/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export default function BookItem({book} : BookItemProps) {

  return (
    <tr className="hover:bg-gray-600 text-black hover:text-white">
      <td className="px-4 py-2">{book.id}</td>
      <td className="px-4 py-2">{book.name}</td>
      <td className="px-4 py-2">{book.description}</td>
      <td className="px-4 py-2">{book.author}</td>
      <td className="px-4 py-2">
        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
          Edit
        </button>
        <Dialog >
  <DialogTrigger className="border border-red-400 px-2 mx-2 bg-red-600 text-white rounded py-1">Delete</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete book data from server.
      </DialogDescription>
    </DialogHeader>
    <div className="flex justify-between">
      <div>
      <button className="bg-red-500 p-2 text-white rounded">Delete</button>
      </div>
      <div>
      <button className="bg-black p-2 text-white rounded">
        cancel</button>
      </div>
    </div>
  </DialogContent>
</Dialog>
      </td>
    </tr>
  );
}
