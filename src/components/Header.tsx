'use client'
import { useAuth } from "@/provider/authProvider"
import Link from "next/link";


export default function Header(){
    const {user}=useAuth();

    return(
        <div className="max-w-full px-6 pt-2 pb-1 text-black flex justify-between border-b-2 border-gray-500 mx-4">
            <div>
                <Link href="/" className="text-black text-2xl">Home</Link>
            </div>
            <div className="text-2xl flex ">
                <div className="px-2">Hello </div>
                <div className="font-bold">
                {user ? ` ${user.username}`:'token expired'}
                </div>
            </div>
        </div>
    )
}