import dbConnect from "@/db";
import userModel from "@/models/user.model";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  try {
    const { email, name, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.json({ message: "Email already exists", success: false });
      return;
    }
    const user = await userModel.create({ name, email, password });
    res.json(user);
  } catch (error: any) {
    res.json({ error: error.message });
  }
}
