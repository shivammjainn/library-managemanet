"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { Trash, } from "lucide-react";

type DeleteModalProps = {
    onConfirm: () => void;
};

export default function DeleteModal({
    onConfirm,
}: DeleteModalProps) {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary" size="icon" className="mx-2 rounded-lg size-8 bg-red-400" >
                    <Trash />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete the item.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-between pt-4">
                    <button
                        onClick={() => {
                            onConfirm();
                            setOpen(false)
                        }}
                        className="bg-red-500 px-4 py-2 text-white rounded hover:bg-red-400"
                    >
                        Delete
                    </button>
                    <button onClick={() => { setOpen(false) }} className="bg-black px-4 py-2 text-white rounded hover:bg-gray-700">Cancel</button>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
