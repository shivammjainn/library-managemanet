import Link from "next/link";


export default function AddBook(){

    return(
        <div className="w-full rounded-2xl border-white">
            <div className="m-2 flex justify-end">
                <Link href={'/addBook'} className="bg-gray-800 w-32 h-16 text-white rounded-2xl text-lg h-12 m-6 flex justify-center items-center hover:bg-gray-500 hover:text-black">Add book</Link>
            </div> 
        </div>
    )
}