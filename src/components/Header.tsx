'use client'
import { useAuth } from "@/provider/authProvider"
import Link from "next/link";


export default function Header(){
    const {user}=useAuth();

    return(
        <div className="max-w-full px-6 py-10 flex justify-between border-b-2 border-gray-500 mx-4">
            <div>
                <Link href="/" className="text-white text-2xl">Home</Link>
            </div>
            <div className="text-2xl font-semibold">
                {user ? `Hello ${user.username}`:'token expired'}
            </div>
        </div>
    )
}