'use client'
import { useAuth } from "@/provider/authProvider"
import NextBreadcrumb from "./next-bread-crumb";
import { LogOutIcon, User2, UserCheckIcon } from "lucide-react";
import { NextResponse } from "next/server";


export default function Header() {
  const { user, isAdmin } = useAuth();
  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      window.location.href = '/';
    } catch (err) {
      return NextResponse.json({ message: "error", err }, { status: 500 })
    }
  }

  return (
    <div className="w-full border-b border-gray-300 bg-white px-6 py-3 shadow-sm flex items-center justify-between text-black">
      <div className="text-lg font-light w-full">
        <NextBreadcrumb
          homeElement={'Home'}
          separator={<span className="text-gray-400"> / </span>}
          activeClasses="text-black font-medium"
          containerClasses="flex"
          listClasses="hover:underline mx-2 text-gray-700"
          capitalizeLinks
        />
      </div>

      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2 text-gray-800">
          <span className="text-gray-600">Hello</span>
          <span className="font-semibold text-gray-900 flex items-center gap-1">
            {user ? user.username : 'Token expired'}
            {isAdmin ? (
              <UserCheckIcon className="h-5 w-5 text-green-600" />
            ) : (
              <User2 className="h-4 w-4 text-gray-400" />
            )}
          </span>
        </div>

        <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-xl transition-colors duration-200">
          <span className="font-medium">Logout</span>
          <LogOutIcon className="h-4 w-4" />
        </button>

      </div>
    </div>

  )
}