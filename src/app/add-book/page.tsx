'use client'
import AddBookForm from "@/components/AddBook/AddBookForm";
import { useAuth } from "@/provider/authProvider";
import NotFound from "@/app/not-found";

export default function Home() {
  const { isAdmin } = useAuth();
  return (
    <div className="">
      {isAdmin && <AddBookForm />}
      {!isAdmin && <NotFound />}
    </div>
  );
}
