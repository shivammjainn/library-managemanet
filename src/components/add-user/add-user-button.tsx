import { UserPlus } from "lucide-react";
import Link from "next/link";


export default function AddUserButton() {

    return (
        <div className="w-full rounded-2xl flex justify-end border-white">
            <Link href={'/users/add-user'} className="">
                <button className="bg-gray-200 py-6 w-32 h-8 text-black rounded-lg text-lg m-6 flex justify-center items-center hover:bg-gray-400 hover:text-black">
                    <UserPlus className="mx-1" />
                    Add User
                </button>
            </Link>
        </div>
    )
}