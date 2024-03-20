import {db} from "@/lib/db";
import {SHA256 as sha256} from "crypto-js";
import {NextResponse} from "next/server";

const hashPassword = (password: string) => {
  return sha256(password).toString();
};
export async function POST(req: Request) {
  try {
    const {name, email, password} = await req.json();
    if (!name || !email || !password) {
      return new NextResponse("Please provide the vaild details", {
        status: 400,
      });
    }

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashPassword(password),
        interestedIn: [],
      },
    });

    return NextResponse.json(user);
  } catch (err) {
    return new NextResponse("Signup Error", {status: 500});
  }
}