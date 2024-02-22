import dbConnect from "@/db";
import userModel from "@/models/user.model";
import { headers } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    // const headersInstance = headers();
    // const BearerToken = headersInstance.get("authorization")?.split(" ")[1]!;
    // const payload = jwt.decode(BearerToken) as JwtPayload;
    const { searchParams } = new URL(request.url);
    const param = searchParams.get("search");
    console.log(param);
    const users = await userModel
      .find({
        $or: [
          { name: { $regex: param, $options: "i" } },
          { username: { $regex: param, $options: "i" } },
        ],
      })
      .select("-password");
    // const filteredUsers = users.filter(
    //   (user: { _id: { toString: () => any } }) =>
    //     user._id.toString() !== payload.userId
    // );
    return NextResponse.json({ users });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
