'use client'
import AddBookForm from "@/components/AddBook/AddBookForm";
import { useAuth } from "@/provider/authProvider";
import NotFound from "./not-found";

export default function Home() {
  const {isAdmin}=useAuth();
  return (
    <div className="bg-gray-300 h-max mx-20 rounded-2xl">
      {isAdmin&&<AddBookForm />}
      {!isAdmin&&<NotFound/>}
    </div>
  );
}
