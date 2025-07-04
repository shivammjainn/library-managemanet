'use client'
import AddBookForm from "@/components/AddBook/add-book-form";
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
