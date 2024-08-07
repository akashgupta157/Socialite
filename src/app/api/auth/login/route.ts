import dbConnect from "@/db";
import userModel from "@/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const POST = async (req: Request, res: Response) => {
  try {
    await dbConnect();
    const { email, password } = await req.json();
    const user = await userModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Email not found", success: false });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({
        message: "Incorrect Password",
        success: false,
      });
    }
    const token = jwt.sign(
      { userId: user._id, user: user.email, username: user.username },
      process.env.SECRET_KEY!
    );
    return NextResponse.json({
      success: true,
      token,
      user,
      message: "Login successful",
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, success: false });
  }
};
