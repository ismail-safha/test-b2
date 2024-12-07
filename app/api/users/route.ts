// == rout

import { NextResponse } from "next/server";
import prisma from "../../../lib/db";

// Get all users with their devices
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        devices: true,
      },
    });
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Delete user by ID
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  try {
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
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
// ==
