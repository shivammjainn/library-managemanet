'use client'
import NotFound from "@/app/not-found";
import AddUserForm from "@/components/add-user/add-user-form";
import useCustomAuth from "@/hooks/useCustomAuth";

export default function AddUserPage() {
    const { isAdmin, loading } = useCustomAuth();
    if (loading) {
        return
    }
    return (
        <div>
            {isAdmin && (
                <AddUserForm />
            )}
            {!isAdmin && (
                <NotFound />
            )}
        </div>
    )
}