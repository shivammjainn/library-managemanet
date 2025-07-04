"use client";

import { useEffect, useState } from "react";
import { User } from "./types/types";
import DataTable from "./data-table";
import DeleteUserModal from "./modals/delete-user-modal";
import RoleDropdown from "./modals/role-drop-down-modal";
import EditUserModal from "./modals/edit-user-modal";
import ActivityModal from "./modals/activity-modal";

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


  return (
    <div className="p-6">
      <DataTable
        data={userList}
        title="👤 User Table"
        columns={["name", "email"]}
        isAdmin={true}
        lastcolumnName="Role"
        lastColumn={(user) => {
          console.log("user", user);
          return (
            <>
              <RoleDropdown
                email={user.email}
                currentRole={user.role}
                onRoleChange={refreshUsers} />
            </>
          );
        }}
        extraColumnName="Actions"
        extraFunction={(user) => {
          return (
            <>
              <div className="flex gap-0.5">
                <DeleteUserModal email={user.email} onConfirm={refreshUsers} />
                <EditUserModal email={user.email} name={user.name} onConfirm={refreshUsers} />
                <ActivityModal disable={user.disabled} email={user.email} onConfirm={refreshUsers} />
              </div>
            </>
          );
        }} />
    </div>
  );
}
