export type Book = {
  id: number;
  name: string;
  description: string;
  author: string;
};
export type BookItemProps = {
  book: Book;
};