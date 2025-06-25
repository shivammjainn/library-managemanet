export type Book = {
  id: number;
  book_name: string;
  description: string;
  book_author: string;
  detail:string;
};
export type BookItemProps = {
  book: Book;
  onDelete: (id: number) => void;
  refreshBooks:()=>void;
};