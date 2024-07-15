import { NextResponse } from "next/server";
import prisma from "../../../lib/db";
import UAParser from "ua-parser-js";
import axios from "axios";
import requestIp from "request-ip";

export async function POST(req: any) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    // Get the user-agent string from the headers
    const userAgent = req.headers.get("user-agent") || "";
    const parser = new UAParser();
    const result = parser.setUA(userAgent).getResult();

    // Extract device information
    const browser = result.browser.name || "Unknown browser";
    const os = result.os.name || "Unknown OS";
    const device = result.device.model || "Unknown device";
    const cpu = result.cpu.architecture || "Unknown CPU";

    // Get IP address using request-ip
    let ip = requestIp.getClientIp(req) || "";

    // If running locally, replace the loopback address with a local IP or an empty string
    if (ip === "::1" || ip === "127.0.0.1") {
      ip = "8.8.8.8"; // You can replace this with your public IP for testing
    }

    // Fetch IP geolocation data using ipinfo
    const token = process.env.IPINFO_API_TOKEN; // Ensure you have this token in your environment variables
    const response = await axios.get(`https://ipinfo.io/${ip}?token=${token}`);
    const ipData = response.data;

    const city = ipData.city || "Unknown city";
    const region = ipData.region || "Unknown region";

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Increment click count
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { clickCount: { increment: 1 } },
    });

    // Save device information
    const userDevice = await prisma.userDevice.create({
      data: {
        userId: updatedUser.id,
        userName: user.name || "Unknown",
        browser: browser,
        os: os,
        ip: ip || "Unknown IP",
        city: city,
        region: region,
        device: device,
        cpu: cpu,
      },
    });

    return NextResponse.json({ updatedUser, userDevice });
  } catch (error: any) {
    console.error("UPDATE_CLICK_COUNT_ERR: ", error);
    return new NextResponse(error.message, { status: 500 });
  }
}
