import Link from "next/link";
import { Button } from "../ui/button";
import Logo from "./logo";
import { Home, User } from "lucide-react";
import { useAuth } from "@/provider/authProvider";
import Image from "next/image";
import { usePathname } from "next/navigation";


export default function SideBar() {
    const { isAdmin } = useAuth();
    const pathname = usePathname();
    return (
        <div className="side-bar flex flex-col justify-between h-screen">
            <div >
                <Logo />
                <div className="mt-4 gap-y-4 ">
                    <div className="my-1 mx-2">
                        <Button
                            className={`w-full ${pathname === "/" ? "bg-gray-300 text-black" : "bg-white text-black"
                                } hover:bg-gray-300`} asChild>
                            <div className="flex justify-start ">
                                <Home className="" />
                                <Link href="/" className="" >Home</Link>
                            </div>
                        </Button>
                    </div>
                    {isAdmin && (
                        <div className="my-1 mx-2">
                            <Button
                                className={`w-full ${pathname === "/users" ? "bg-gray-300 text-black" : "bg-white text-black"
                                    } hover:bg-gray-300`} asChild>
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