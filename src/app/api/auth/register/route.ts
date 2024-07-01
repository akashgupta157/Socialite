import dbConnect from "@/db";
import userModel from "@/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const generateUniqueUsername = async (name: string): Promise<string> => {
  const generatedUsername =
    name.replace(/\s+/g, "").toLowerCase() + Math.floor(Math.random() * 1000);
  if (!/^[a-zA-Z0-9.]+$/.test(generatedUsername)) {
    return generateUniqueUsername(name);
  }
  const existingUsername = await userModel.findOne({
    username: generatedUsername,
  });
  if (existingUsername) {
    return generateUniqueUsername(name);
  }
  return generatedUsername;
};
export const POST = async (req: Request, res: Response) => {
  try {
    await dbConnect();
    const { email, name, password } = await req.json();
    const existingUser = await userModel.findOne({ email });
    const username = await generateUniqueUsername(name);
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
      username,
    });
    const token = jwt.sign(
      { userId: user._id, user: user.email, username: user.username },
      process.env.SECRET_KEY!
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
