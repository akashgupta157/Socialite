import dbConnect from "@/db";
import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    await dbConnect();
    const user = await userModel
      .findOne({ username: params.username })
      .select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found", success: false });
    }
    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
