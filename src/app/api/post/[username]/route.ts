import dbConnect from "@/db";
import userModel from "@/models/user.model";
import { headers } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    await dbConnect();
    const user = await userModel
      .findOne({ username: params.username })
      .select("-password")
      .populate("posts");
    if (!user) {
      return NextResponse.json({ message: "User not found", success: false });
    }
    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
export async function POST(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    await dbConnect();
    const headersInstance = headers();
    const BearerToken = headersInstance.get("authorization")?.split(" ")[1]!;
    const payload = jwt.decode(BearerToken) as JwtPayload;
    if (payload.username === params.username) {
      return NextResponse.json({ message: "matched", success: true });
    } else {
      return NextResponse.json({ message: "not matched", success: true });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
