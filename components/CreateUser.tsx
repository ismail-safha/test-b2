"use client";

import React, { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const CreateUser = () => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        console.log("Success: User created");
        await fetchUsers(); // Refresh user list after creation
      } else {
        const { error } = await res.json();
        setError(error.message);
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/getusers/");
      if (res.ok) {
        const { users } = await res.json();
        setUsers(users);
      } else {
        const { error } = await res.json();
        setError(error.message);
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const res = await fetch(`/api/deleteuser/${userId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        console.log("Success: User deleted");
        await fetchUsers(); // Refresh user list after deletion
      } else {
        const { error } = await res.json();
        setError(error.message);
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <form
        onSubmit={handleCreateUser}
        className="flex flex-col space-y-4 mb-8"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Create User
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-4">All Users</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Created At</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.role}</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
    </div>
  );
};

export default CreateUser;
