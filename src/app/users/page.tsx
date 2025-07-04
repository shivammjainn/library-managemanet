'use client'
import UserList from "@/components/user-list";
import AddUserButton from "@/components/add-user/add-user-button";
import NotFound from "@/app/not-found";
import useCustomAuth from "@/hooks/useCustomAuth";

export default function UsersPage() {
    const { isAdmin, loading } = useCustomAuth();
    if (loading) return;
    return (
        <div className="bg-white">
            {isAdmin &&
                (<>
                    <AddUserButton />
                    <UserList />
                </>)}
            {!isAdmin && (
                <NotFound />
            )}

        </div>
    );
}