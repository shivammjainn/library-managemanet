import { BookHeartIcon, Library } from "lucide-react";
import Link from "next/link";


export default function AddBook() {

    return (
        <div className="w-full rounded-2xl flex justify-end border-white">
            <Link href='/add-book' className="">
                <button className="bg-gray-200 py-6 w-32 h-8 text-black rounded-lg text-lg m-6 flex justify-center items-center hover:bg-gray-400 hover:text-black">
                    <BookHeartIcon className="mx-1" />
                    Add Book
                </button>
            </Link>
        </div>
    )
}