"use client";

import React from "react";
import { BookItemProps } from "./types/types";
import DeleteModal from "./modals/delete-modal";
import EditModal from "./modals/edit-modal";
import { useAuth } from "@/provider/authProvider";
import DetailModal  from "./modals/detail-modal";


export default function BookItem({ book, onDelete, refreshBooks }: BookItemProps) {
  const { isAdmin } = useAuth();
  
  return (
    <tr className="hover:bg-gray-400 text-black hover:text-white hover:font-medium">
      <td className="px-6 py-2">{book.id}</td>
      <td className="px-6 py-2">{book.book_name}</td>
      <td className="px-6 py-2">{book.description}</td>
      <td className="px-6 py-2">{book.book_author}</td>
      <td className="px-4 py-2 flex justify-start">

        {isAdmin && (<> 
        <EditModal book={book} onConfirm={refreshBooks} /> 
        <DeleteModal onConfirm={() => onDelete(book.id)} />
          <DetailModal book={book}/>
          </>)
        }
        {!isAdmin &&(
          <>
          <DetailModal book={book}/></>
        )}

      </td>
    </tr>
  );
}
