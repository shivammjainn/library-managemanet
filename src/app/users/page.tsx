'use client'
import UserList from "@/components/user-list";
import AddUserButton from "@/components/AddUser/add-user-button";
import { useAuth } from "@/provider/authProvider";
import NotFound from "@/app/not-found";
import useCustomAuth from "@/hooks/useCustomAuth";

export default function UsersPage() {
    const { isAdmin, loading } = useCustomAuth();
    if (loading) return;
    return (
        <div className="bg-white">
            {isAdmin &&
                (
                    <>
                        <div className="flex">
                            <AddUserButton />
                        </div>
                        <UserList />
                    </>

                )}
            {!isAdmin && (
                <NotFound />
            )}

        </div>
    );
}