import dbConnect from "@/db";
import userModel from "@/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const POST = async (req: Request, res: Response) => {
  try {
    await dbConnect();
    const { email, name, password } = await req.json();
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        message: "Email already exists",
        success: false,
      });
    }
    var hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { userId: user._id, user: user.email },
      process.env.secretKey!
    );
    return NextResponse.json({
      success: true,
      token,
      user,
      message: "Registration completed successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, success: false });
  }
};
