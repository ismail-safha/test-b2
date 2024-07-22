// import { getServerSession } from "next-auth";
// import { authOptions } from "../../lib/auth";
// import ProtectedComponent from "../../components/ProtectedComponent";
// import CreateUser from "../../components/CreateUser";
// import SignOut from "../../components/SignOut";

// const page = async () => {
//   const session = await getServerSession(authOptions);

//   return (
//     <ProtectedComponent>
//       <div className="h-[100%] bg-gray-100 flex">
//         {session?.user.role === "ADMIN" && (
//           <>
//             {/* Sidebar */}
//             <div className="w-64 bg-gray-800">
//               <div className="flex items-center justify-center h-16 border-b border-gray-700">
//                 <h1 className="text-white text-lg font-semibold">Dashboard</h1>
//               </div>
//               <div className="flex flex-col">
//                 <nav className="mt-10">
//                   <div className="block py-2 px-4 text-gray-400 hover:bg-gray-700 hover:text-white">
//                     User
//                   </div>
//                 </nav>
//                 <div className="bg-slate-50 ">
//                   <SignOut />
//                 </div>
//               </div>
//             </div>

//             <div className="flex-1">
//               <h2 className="text-2xl p-6  text-center font-semibold">
//                 Welcome admin {session?.user.name}{" "}
//               </h2>
//               <CreateUser />
//             </div>
//           </>
//         )}
//       </div>
//     </ProtectedComponent>
//   );
// };

// export default page;
// ========================

// import CreateUser from "../../components/CreateUser";

// const page = async () => {
//   return (
//     <div className="h-[100%] bg-gray-100 flex">
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-800">
//         <div className="flex items-center justify-center h-16 border-b border-gray-700">
//           <h1 className="text-white text-lg font-semibold">Dashboard</h1>
//         </div>
//         <div className="flex flex-col">
//           <nav className="mt-10">
//             <div className="block py-2 px-4 text-gray-400 hover:bg-gray-700 hover:text-white">
//               User
//             </div>
//           </nav>
//           <div className="bg-slate-50 "></div>
//         </div>
//       </div>

//       <div className="flex-1">
//         <h2 className="text-2xl p-6  text-center font-semibold">
//           Welcome admin
//         </h2>
//         <CreateUser />
//       </div>
//     </div>
//   );
// };

// export default page;

//===
import CreateUser from "../../components/CreateUser";

const Page = async () => {
  return (
    <div className="h-full bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 hidden lg:block">
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          <h1 className="text-white text-lg font-semibold">Dashboard</h1>
        </div>
        <div className="flex flex-col">
          <nav className="mt-10">
            <div className="block py-2 px-4 text-gray-400 hover:bg-gray-700 hover:text-white">
              User
            </div>
          </nav>
        </div>
      </div>

      <div className="flex-1 p-6 w-full">
        <h2 className="text-2xl font-semibold mb-4">Welcome, Admin</h2>
        <CreateUser />
      </div>
    </div>
  );
};

export default Page;
