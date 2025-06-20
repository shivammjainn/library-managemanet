export interface Book {
  id: number;
  name: string;
  description: string;
  author: string;
}

export const books: Book[] = [
  {
    id: 1,
    name: "The Great Gatsby",
    description: "A classic American novel about the Jazz Age",
    author: "F. Scott Fitzgerald"
  },
  {
    id: 2,
    name: "To Kill a Mockingbird",
    description: "A gripping tale of racial injustice",
    author: "Harper Lee"
  },
  {
    id: 3,
    name: "1984",
    description: "A dystopian social science fiction novel",
    author: "George Orwell"
  },
  {
    id: 4,
    name: "Pride and Prejudice",
    description: "A romantic novel of manners",
    author: "Jane Austen"
  },
  {
    id: 5,
    name: "The Catcher in the Rye",
    description: "A controversial novel about teenage rebellion",
    author: "J.D. Salinger"
  }
];
