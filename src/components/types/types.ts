import { ReactNode } from "react";
import { z } from "zod";

export type Book = {
  id: number;
  book_name: string;
  description: string;
  book_author: string;
  detail:string;
  available:boolean;
};
export type User={
  name:string;
  email:string;
  password:string;
  role:'user'|'admin';

}
export type BookItemProps = {
  book: Book;
  onDelete: (id: number) => void;
  refreshBooks:()=>void;
};

export type TBreadCrumbProps = {
    homeElement: ReactNode,
    separator: ReactNode,
    containerClasses?: string,
    listClasses?: string,
    activeClasses?: string,
    capitalizeLinks?: boolean
}


