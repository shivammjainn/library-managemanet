'use client';

import AddBook from "@/components/add-book";
import BookList from "@/components/book-list";
import { useAuth } from "@/provider/authProvider";



export default function Home() {
  const { isAdmin } = useAuth();

  return (
    <div className="bg-white">
      <div className="flex">
        {isAdmin && (
          <>
            <AddBook />
          </>
        )}
      </div>

      {<BookList />}
    </div>
  );
}
