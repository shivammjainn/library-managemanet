import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { useState } from "react";
import { NextResponse } from "next/server";
import { DialogDescription } from "@radix-ui/react-dialog";

type EditUserModalProps = {
    name: string;
    email: string;
    onConfirm: () => void;
}

export default function EditUserModal({ name, email, onConfirm }: EditUserModalProps) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(
        {
            name: name,
            email: email,
            oldEmail: email,
        }
    )
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    const updateUserChages = async () => {
        try {
            const res = await fetch(`/api/update-user`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!res.ok) {
                const err = await res.json();
                return NextResponse.json({ err, status: 400 });
            }
            const data = await res.json();
            setFormData(
                {
                    name: data.user.name,
                    email: data.user.email,
                    oldEmail: data.user.email,
                }
            )
            onConfirm();
            setOpen(false);
        } catch (err) {
            return NextResponse.json({ err, status: 500 });
        }
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="mx-2 rounded-lg size-8 bg-blue-300">
                        <Edit />
                    </Button>
                </DialogTrigger>
                <DialogDescription></DialogDescription>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update User Detail</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <label htmlFor="name">User Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="border border-black rounded px-2" />
                        </div>
                        <div className="grid gap-3">
                            <label htmlFor="email">User Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border border-black rounded px-2" />
                        </div>
                    </div>

                    <DialogFooter>
                        <button
                            type="submit"
                            onClick={updateUserChages}
                            className="bg-blue-500 px-4 py-2 text-white rounded hover:bg-blue-400"
                        >Update Changes</button>
                    </DialogFooter>

                </DialogContent>
            </Dialog>
        </div>
    )
}