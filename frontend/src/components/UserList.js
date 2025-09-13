import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../services/api";

export default function UserList() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await getAllUsers();
    setUsers(res.data);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="mt-4">
      <h2>User List</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.firstName} {u.lastName} ({u.email})
            <button onClick={() => handleDelete(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
