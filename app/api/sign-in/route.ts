import {db} from "@/lib/db";
import {SHA256 as sha256} from "crypto-js";
import {NextResponse} from "next/server";
import {hashPassword} from "../sign-up/route";
import {createJWTandCookie} from "@/lib/JWTandCookie";

export async function POST(req: Request) {
  try {
    const {email, password} = await req.json();
    if (!email || !password) {
      return new NextResponse("Invaild input", {status: 400});
    }

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (user && user.password === hashPassword(password))
      return new NextResponse("Invaild details", {status: 400});

    createJWTandCookie(user?.id!);
    return NextResponse.json(user);
  } catch (err) {
    return new NextResponse("Sign-in Error", {status: 500});
  }
}
