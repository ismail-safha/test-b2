import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "../../../lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, password } = body;

    if (!email || !password) {
      return new NextResponse("Missing data", { status: 500 });
    }

    const userAlreadyExist = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlreadyExist?.id) {
      return new NextResponse("User already exist", { status: 500 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(newUser);
  } catch (err: any) {
    console.log("REGISTER_ERR: " + err);
    return new NextResponse(err, { status: 500 });
  }
}
