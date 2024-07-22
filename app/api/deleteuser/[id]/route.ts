// import { NextResponse } from "next/server";
// import prisma from "../../../../lib/db";

// interface Context {
//   params: {
//     id: string;
//   };
// }

// export async function DELETE(req: Request, context: Context) {
//   try {
//     const id: string = context.params.id;

//     const deletedUser = await prisma.user.delete({
//       where: { id },
//     });

//     return NextResponse.json(
//       {
//         user: deletedUser,
//         message: "User deleted successfully",
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: "Something went wrong",
//       },
//       { status: 500 }
//     );
//   }
// }

//==

import { NextResponse } from "next/server";
import prisma from "../../../../lib/db";

interface Context {
  params: {
    id: string;
  };
}

export async function DELETE(req: Request, context: Context) {
  try {
    const id: string = context.params.id;

    // Delete user devices first
    await prisma.userDevice.deleteMany({
      where: { userId: id },
    });

    // Then delete the user
    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        user: deletedUser,
        message: "User and associated devices deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
