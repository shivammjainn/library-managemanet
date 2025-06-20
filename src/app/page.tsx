import AddBook from "@/components/AddBook";
import BookList from "@/components/BookList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="m-8 " >
    <AddBook/>
    <BookList/>
    </div>
  );
}
