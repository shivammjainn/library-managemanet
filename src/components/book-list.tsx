"use client";

import { useEffect, useState } from "react";
import BookItem from "./book-item";
import { Book } from "./types/types";
import { NextResponse } from "next/server";
import useCustomAuth from "@/hooks/useCustomAuth";
import DataTable from "./data-table";
import EditModal from "./modals/edit-modal";
import DeleteModal from "./modals/delete-modal";
import DetailModal from "./modals/detail-modal";

export default function BookList() {
  const [bookList, setBookList] = useState<Book[]>([]);
  const { isAdmin, loading } = useCustomAuth();

  const refreshBooks = async () => {
    const res = await fetch("/api/get-books");
    const json = await res.json();
    let books = json.data;
    if (!isAdmin) {
      books = books.filter((book: any) => book.available === true);
    }
    setBookList(books);
  };

  useEffect(() => {
    if (!loading) {
      refreshBooks();
    }
  }, [isAdmin, loading]);

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/delete-book?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await refreshBooks();
      } else {
        const err = await res.json();
        NextResponse.json({ message: err }, { status: 500 })
      }
    } catch (err) {
      NextResponse.json({ message: "error deleteing book", err }, { status: 500 })
    }
  };

  return (
    <div className="p-6">
      <DataTable
        title="📚 Library Books"
        columns={["ID", "Book Name", "Description", "Book Author"]}
        isAdmin={true}
        data={bookList}
        lastcolumnName="Actions"
        lastColumn={(book) => (
          <>
            {
              isAdmin && (
                <>
                  <EditModal book={book} onConfirm={refreshBooks} />
                  <DeleteModal onConfirm={() => handleDelete(book.id)} />
                  <DetailModal book={book} />
                </>
              )

            }
            {!isAdmin && (
              <DetailModal book={book} />
            )}
          </>
        )}
      />
    </div>
  );
}
