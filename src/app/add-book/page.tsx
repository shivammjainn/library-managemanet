'use client'
import AddBookForm from "@/components/add-book/add-book-form";
import { useAuth } from "@/provider/authProvider";
import NotFound from "@/app/not-found";

export default function AddBook() {
  const { isAdmin } = useAuth();
  return (
    <>
      {isAdmin && <AddBookForm />}
      {!isAdmin && <NotFound />}
    </>
  );
}
