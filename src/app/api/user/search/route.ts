import dbConnect from "@/db";
import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const param = searchParams.get("search");
    const userId = searchParams.get("user");
    const users = await userModel
      .find({
        $or: [
          { name: { $regex: param, $options: "i" } },
          { username: { $regex: param, $options: "i" } },
        ],
      })
      .select("-password");
    const filteredUsers = users.filter(
      (user: { _id: { toString: () => any } }) => user._id.toString() !== userId
    );
    return NextResponse.json({ users: filteredUsers });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
