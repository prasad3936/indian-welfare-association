import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json(
        { success: false, message: "Admin password not configured" },
        { status: 500 },
      );
    }

    if (password === adminPassword) {
      return NextResponse.json({
        success: true,
        message: "Login successful",
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid password" },
      { status: 401 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
