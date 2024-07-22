// "use client";

// import React, { useEffect, useState } from "react";

// interface User {
//   id: string;
//   name: string;
//   clickCount: number;
//   email: string;
//   role: string;
//   createdAt: string;
// }

// const CreateUser = () => {
//   const [error, setError] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [clickCount, clickCountSet] = useState("");
//   const [password, setPassword] = useState("");
//   const [users, setUsers] = useState<User[]>([]);

//   // const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
//   //   e.preventDefault();
//   //   try {
//   //     const res = await fetch("/api/createuser", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({ name, email, password }),
//   //     });

//   //     if (res.ok) {
//   //       console.log("Success: User created");
//   //       await fetchUsers(); // Refresh user list after creation
//   //     } else {
//   //       const { error } = await res.json();
//   //       setError(error.message);
//   //     }
//   //   } catch (error) {
//   //     setError("Something went wrong");
//   //   }
//   // };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await fetch("/api/getusers/");
//       if (res.ok) {
//         const { users } = await res.json();
//         setUsers(users);
//       } else {
//         const { error } = await res.json();
//         setError(error.message);
//       }
//     } catch (error) {
//       setError("Something went wrong");
//     }
//   };

//   const handleDeleteUser = async (userId: string) => {
//     try {
//       const res = await fetch(`/api/deleteuser/${userId}`, {
//         method: "DELETE",
//       });
//       if (res.ok) {
//         console.log("Success: User deleted");
//         await fetchUsers(); // Refresh user list after deletion
//       } else {
//         const { error } = await res.json();
//         setError(error.message);
//       }
//     } catch (error) {
//       setError("Something went wrong");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       {/*

//       <form
//         onSubmit={handleCreateUser}
//         className="flex flex-col space-y-4 mb-8"
//       >
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Name"
//           className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
//         />
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
//         >
//           Create User
//         </button>
//       </form>

//        */}

//       <h2 className="text-2xl font-semibold mb-4">All Users</h2>
//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr>
//             <th className="border border-gray-300 px-4 py-2">Id</th>
//             <th className="border border-gray-300 px-4 py-2">Name</th>
//             <th className="border border-gray-300 px-4 py-2">clickCount</th>
//             <th className="border border-gray-300 px-4 py-2">Email</th>
//             <th className="border border-gray-300 px-4 py-2">Role</th>
//             <th className="border border-gray-300 px-4 py-2">Created At</th>
//             <th className="border border-gray-300 px-4 py-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td className="border border-gray-300 px-4 py-2">{user.id}</td>
//               <td className="border border-gray-300 px-4 py-2">{user.name}</td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {user.clickCount}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">{user.email}</td>
//               <td className="border border-gray-300 px-4 py-2">{user.role}</td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {new Date(user.createdAt).toLocaleDateString()}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">
//                 <button
//                   onClick={() => handleDeleteUser(user.id)}
//                   className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {error && <p className="text-red-500 mt-4">Error: {error}</p>}
//     </div>
//   );
// };

// export default CreateUser;
//===

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
