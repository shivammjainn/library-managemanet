import Link from "next/link";


export default function AddBook(){

    return(
        <div className="w-full rounded-2xl border-white">
            <div className="flex justify-end">
                <Link href={'/add-book'} className="">
                <button className="bg-gray-200 w-32 h-8 text-black rounded-lg text-lg m-6 flex justify-center items-center hover:bg-gray-500 hover:text-black">
                Add book
                </button>
                </Link>
            </div> 
        </div>
    )
}