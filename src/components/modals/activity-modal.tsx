import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { NextResponse } from "next/server";


type ActivityModalProps = {
    disable: boolean;
    email: string;
    onConfirm: () => void;
}


export default function ActivityModal({ disable, email, onConfirm }: ActivityModalProps) {
    const handleDisable = async () => {
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }
        try {
            const res = await fetch("api/disable-user", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, disable })
            })
            if (res.ok) {
                const data = await res.json();
                console.log("User status updated:", data);
                onConfirm();
                return NextResponse.json({ message: "User status updated successfully" }, { status: 200 });
            }
            const errorData = await res.json();
            console.error("Error updating user status:", errorData);
            return NextResponse.json({ message: "Error updating user status" }, { status: 500 });

        } catch (err) {
            return NextResponse.json({ message: "Error updating user status" }, { status: 500 })
        }
    }

    return (
        <div className="flex">
            <div className="flex items-center space-x-2 ">
                <Switch checked={!disable} onCheckedChange={handleDisable} id="airplane-mode" />
                <Label htmlFor="airplane-mode">User Status</Label>
            </div>
        </div >
    );
}