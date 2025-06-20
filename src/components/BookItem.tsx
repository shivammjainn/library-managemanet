"use client";

import React from "react";
import { Book } from "./types/types";



type BookItemProps = {
  book: Book;
};

export default function BookItem({ book }: BookItemProps) {
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
        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mx-4">
          Delete
        </button>
      </td>
    </tr>
  );
}
