"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import StatusLoading from "@/app/components/StatusLoading";
import { toast } from "react-toastify";

interface UserDevice {
  id: string;
  userName: string;
  browser: string;
  os: string;
  device: string;
  ip: string;
  city: string;
  region: string;
  cpu: string;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  clickCount: number;
  email: string;
  role: string;
  createdAt: string;
  devices: UserDevice[];
}

const CreateUser = () => {
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/deleteuser/${userId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("User deleted successfully");
        await fetchUsers();
      } else {
        const { error } = await res.json();
        setError(error.message);
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers((prev) => {
      const newSelectedUsers = new Set(prev);
      if (newSelectedUsers.has(userId)) {
        newSelectedUsers.delete(userId);
      } else {
        newSelectedUsers.add(userId);
      }
      return newSelectedUsers;
    });
  };

  const handleDeleteSelectedUsers = async () => {
    setLoading(true);
    try {
      const promises = Array.from(selectedUsers).map((userId) =>
        fetch(`/api/deleteuser/${userId}`, {
          method: "DELETE",
        })
      );
      await Promise.all(promises);
      toast.success("Selected users deleted successfully");
      await fetchUsers();
      setSelectedUsers(new Set());
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleExpand = (userId: string) => {
    setExpandedUserId((prev) => (prev === userId ? null : userId));
  };

  const { data: session, status } = useSession();
  if (status === "loading") {
    return <StatusLoading />;
  }

  return session?.user.role === "ADMIN" ? (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Users</h2>
      {loading && <p>Loading...</p>}
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 border-b">Select</th>
              <th className="p-3 border-b">No.</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Click Count</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Role</th>
              <th className="p-3 border-b">Created At</th>
              <th className="p-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users.map((user, index) => (
              <>
                <tr
                  key={user.id}
                  onClick={() => handleToggleExpand(user.id)}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <td className="p-3 border-b">
                    <input
                      type="checkbox"
                      checked={selectedUsers.has(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b">{user.name}</td>
                  <td className="p-3 border-b">{user.clickCount}</td>
                  <td className="p-3 border-b">{user.email}</td>
                  <td className="p-3 border-b">{user.role}</td>
                  <td className="p-3 border-b">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 border-b">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteUser(user.id);
                      }}
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {expandedUserId === user.id && (
                  <tr>
                    <td colSpan={8} className="p-3 border-b">
                      <table className="w-full mt-2 bg-gray-50 rounded-lg border border-gray-200">
                        <thead className="bg-gray-100 text-gray-600">
                          <tr>
                            <th className="p-3 border-b">Browser</th>
                            <th className="p-3 border-b">OS</th>
                            <th className="p-3 border-b">Device</th>
                            <th className="p-3 border-b">City</th>
                            <th className="p-3 border-b">Region</th>
                            <th className="p-3 border-b">Created At</th>
                          </tr>
                        </thead>
                        <tbody>
                          {user.devices.map((device) => (
                            <tr key={device.id}>
                              <td className="p-3 border-b">{device.browser}</td>
                              <td className="p-3 border-b">{device.os}</td>
                              <td className="p-3 border-b">{device.device}</td>
                              <td className="p-3 border-b">{device.city}</td>
                              <td className="p-3 border-b">{device.region}</td>
                              <td className="p-3 border-b">
                                {new Date(
                                  device.createdAt
                                ).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={handleDeleteSelectedUsers}
        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none mt-4"
      >
        Delete Selected Users
      </button>
      {/* {error && <p className="text-red-500 mt-4">Error: {error}</p>} */}
      {/* <toast.Container /> */}
    </div>
  ) : (
    "You are not admin"
  );
};

export default CreateUser;

//============
