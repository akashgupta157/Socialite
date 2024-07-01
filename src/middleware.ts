import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server";
export default async function middleware(req: NextRequest) {
  console.log("Hello from middleware");
  try {
    const BearerToken = req.headers.get("authorization")?.split(" ")[1];
    if (!BearerToken) {
      return NextResponse.json({
        message: "No token found",
      });
    }
    const signature = new TextEncoder().encode(process.env.SECRET_KEY);
    await jose.jwtVerify(BearerToken, signature);
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      message: "Something went wrong in middleware",
    });
  }
}
export const config = {
  matcher: ["/api/post", "/api/user", "/api/comment"],
};
