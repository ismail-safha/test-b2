import { NextResponse } from "next/server";
import prisma from "../../../../lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const { blocked } = await req.json();

    if (typeof blocked !== "boolean") {
      return new NextResponse("Invalid data", { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { blocked },
    });

    return NextResponse.json(updatedUser);
  } catch (err: any) {
    console.error("Error updating user:", err);
    return new NextResponse("Server error", { status: 500 });
  }
}
