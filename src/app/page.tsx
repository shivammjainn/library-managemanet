import AddBook from "@/components/add-book";
import BookList from "@/components/book-list";

export default function Home() {
  return (
    <div className="bg-white" >
    <AddBook/>
    <BookList/>
    </div>
  );
}
