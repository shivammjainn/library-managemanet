'use client'
import NotFound from "@/app/not-found";
import AddUserForm from "@/components/AddUser/add-user-form";
import useCustomAuth from "@/hooks/useCustomAuth";

export default function AddUserPage() {
    const { isAdmin, loading } = useCustomAuth();


    if (loading) {
        return
    }
    return (
        <div>
            {isAdmin && (
                <div>
                    <AddUserForm />
                </div>
            )}
            {!isAdmin && (
                <NotFound />
            )}
        </div>
    )
}