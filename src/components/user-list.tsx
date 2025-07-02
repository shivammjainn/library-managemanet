"use client";

import { useEffect, useState } from "react";
import { User } from "./types/types";
import DataTable from "./data-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "./ui/dropdown-menu";
import { DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { NextResponse } from "next/server";
import { ChevronDownCircle } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";

export default function UserList() {
  const [userList, setUserList] = useState<User[]>([]);
  const refreshUsers = async () => {
    const res = await fetch("/api/get-users");
    const json = await res.json();
    const users = json.data;
    setUserList(users);
  };
  useEffect(() => {
    refreshUsers();
  }, []);

  const demoteRole = async (email: string, role: string) => {
    if (role === 'user') {
      return;
    }
    try {
      const res = await fetch("api/demote-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, role }),
      })
      if (!res.ok) {
        throw new Error("Failed to Demote");
      }
      refreshUsers();
    } catch (error) {
      NextResponse.json({ message: "error demoting", error }, { status: 500 })
    }
  }


  const updateRole = async (email: string, role: string) => {
    if (role === 'admin') {
      return;
    }
    try {
      const res = await fetch("/api/update-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, role }),
      });
      if (!res.ok) {
        throw new Error("Failed to update role");
      }
      refreshUsers();
    } catch (error) {
      return NextResponse.json({ message: "error updating role", error }, { status: 500 });
    }
  }
  return (
    <div className="p-6">
      <DataTable
        data={userList}
        title="👤 User Table"
        columns={["name", "email"]}
        isAdmin={true}
        lastcolumnName="Role"
        lastColumn={(user) => {
          const [position, setPosition] = useState(user.role);
          const [selectedRole, setSelectedRole] = useState<string>();
          const [dialogOpen, setDialogOpen] = useState(false);
          const [dropdownOpen, setDropdownOpen] = useState(false);

          const handleRoleChange = (value: string) => {
            setDropdownOpen(false);
            setSelectedRole(value);
            setDialogOpen(true);
          }

          const handleConfirm = () => {
            if (selectedRole === "admin") updateRole(user.email, user.role);
            else if (selectedRole === "user") demoteRole(user.email, user.role);

            setPosition(selectedRole);
            setDialogOpen(false);
          }

          return (
            <>
              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" className="flex justify-between w-24">
                    {user.role}
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
                    Are you sure you want to change {user.email}'s role to{" "}
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
        }}
      />
    </div>
  );
}
