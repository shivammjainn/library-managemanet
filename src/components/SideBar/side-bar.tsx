import Link from "next/link";
import { Button } from "../ui/button";
import Logo from "./logo";
import { Book, Home, LogOut, User } from "lucide-react";
import { useAuth } from "@/provider/authProvider";
import Image from "next/image";


export default function SideBar() {
    const { isAdmin } = useAuth();
    return (
        <div className="side-bar flex flex-col justify-between h-screen">
            <div>
                <div>
                    <Logo />
                </div>
                <div className="mt-4 gap-y-4 ">
                    <div className="my-1">
                        <Button className="w-full bg-white hover:bg-gray-300 text-black" asChild>
                            <div className="flex justify-start ">
                                <Home className="" />
                                <Link href="/" className="" >Home</Link>
                            </div>
                        </Button>
                    </div>
                    <div className="my-1">
                        <Button className="w-full bg-white hover:bg-gray-300 text-black" asChild>
                            <div className="flex justify-start">
                                <Book className="" />
                                <Link href="/" className="" >Books</Link>
                            </div>
                        </Button>
                    </div>
                    {isAdmin && (
                        <div className="my-1">
                            <Button className="w-full bg-white hover:bg-gray-300 text-black" asChild>
                                <div className="flex justify-start">
                                    <User className="" />
                                    <Link href="/users" className="" >Users</Link>
                                </div>
                            </Button>
                        </div>
                    )}


                </div>
            </div>
            <div className=" mb-4 flex justify-center">
                <Image src={"https://i.pinimg.com/736x/f0/73/08/f0730865d34ba4cd1d912393e8cee146.jpg"} alt="profile" width={50} height={50} className="rounded-full" />
            </div>

        </div>
    );
}