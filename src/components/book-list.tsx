"use client";

import { useEffect, useState } from "react";
import BookItem from "./book-item"; 
import { Book } from "./types/types";
import { NextResponse } from "next/server";

export default function BookList() {
  const [bookList, setBookList] = useState<Book[]>([]);

  const refreshBooks = async () => {
    const res = await fetch("/api/get-books");
    const json = await res.json();
    const books = json.data;
    setBookList(books);
  };

  useEffect(() => {
    refreshBooks();
  }, []);

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/delete-book?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      await refreshBooks();
    } else {
      const err = await res.json();
      NextResponse.json({message:err},{status:500})
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl text-black font-bold mb-4">Library Books</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white text-left">
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Author</th>
              <th className="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookList.map((book) => (
              <BookItem
                key={book.id}
                book={book}
                onDelete={handleDelete}
                refreshBooks={refreshBooks}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
