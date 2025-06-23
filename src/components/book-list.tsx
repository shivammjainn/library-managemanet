"use client";

import { useEffect, useState } from "react";
import BookItem from "./book-item"; 
import {Book} from './types/types'
export default function BookList() {
  const [bookList, setBookList] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch("/api/get-books");
      const response = await res.json();
      setBookList(response.data);
    };
    fetchBooks();
  }, []);

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
            {bookList?.map((book) => (
              <BookItem key={book.id} book={book} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
