import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronDownCircle } from "lucide-react";

export default function RoleDropdown({
    email,
    currentRole,
    onRoleChange,
}: {
    email: string;
    currentRole: string;
    onRoleChange: () => void;
}) {
    const [position, setPosition] = useState(currentRole);
    const [selectedRole, setSelectedRole] = useState<string>();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleRoleChange = (value: string) => {
        setDropdownOpen(false);
        setSelectedRole(value);
        setDialogOpen(true);
    };

    const handleConfirm = async () => {
        if (selectedRole === "admin" && currentRole !== "admin") {
            await updateRole(email, currentRole);
        } else if (selectedRole === "user" && currentRole !== "user") {
            await demoteRole(email, currentRole);
        }

        setPosition(selectedRole!);
        setDialogOpen(false);
        onRoleChange();
    };

    const updateRole = async (email: string, role: string) => {
        await fetch("/api/update-role", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, role }),
        });
    };

    const demoteRole = async (email: string, role: string) => {
        await fetch("/api/demote-role", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, role }),
        });
    };

    return (
        <>
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" className="flex justify-between w-28 border shadow-lg">
                        {position}
                        <ChevronDownCircle />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="mt-2">
                    <DropdownMenuLabel className="my-1">Select Role</DropdownMenuLabel>
                    <DropdownMenuSeparator className="border border-gray-300 mb-1" />
                    <DropdownMenuRadioGroup value={position} onValueChange={handleRoleChange}>
                        <DropdownMenuRadioItem value="user">User</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="admin">Admin</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Confirm Role Change</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-gray-600">
                        Are you sure you want to change {email}'s role to{" "}
                        <span className="font-semibold">{selectedRole}</span>?
                    </p>
                    <DialogFooter>
                        <Button variant="secondary" onClick={() => setDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleConfirm}>Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
