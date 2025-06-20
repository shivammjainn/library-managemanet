'use client';

import { books } from '@/constants/Books';
import { useEffect, useState } from 'react';

export default function BookList() {

    const [bookList,setBookList]=useState<Book[]>([]);
  useEffect(()=>{
    const fetchBooks=async()=>{
      const res=await fetch('/api/get-books');
      const data=await res.json();
      setBookList(data);

    };
    fetchBooks();
  },[]);


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Library Books</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-800 text-left">
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
              <tr key={book.id} className="hover:bg-gray-600">
                <td className="px-4 py-2 border-b">{book.id}</td>
                <td className="px-4 py-2 border-b">{book.name}</td>
                <td className="px-4 py-2 border-b">{book.description}</td>
                <td className="px-4 py-2 border-b">{book.author}</td>
                <td className="px-4 py-2 border-b">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mx-4">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
