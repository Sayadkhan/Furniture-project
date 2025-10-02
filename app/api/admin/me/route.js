import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";

const JWT_SECRET = process.env.JWT_SECRET; // make sure this exists

export async function GET() {
  try {
    await connectDB();

    // 1. Get token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    // 2. Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // 3. Find user by ID from token payload
    const user = await Admin.findById(decoded.id)
      .select("-password -__v")
      .lean();
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 4. Return user info
    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error("GET /api/users/me error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
