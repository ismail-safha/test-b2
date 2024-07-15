
import { NextResponse } from "next/server";
import prisma from "../../../lib/db";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}