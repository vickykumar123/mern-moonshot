import {createJWTandCookie} from "@/lib/JWTandCookie";
import {db} from "@/lib/db";
import bcrypt from "bcryptjs";
import {NextResponse} from "next/server";

const hashPassword = async (password: string) => {
  const passwordHash = await bcrypt.hash(password, 12);
  return passwordHash;
};
export async function POST(req: Request) {
  try {
    const {name, email, password} = await req.json();
    if (!name || !email || !password) {
      return new NextResponse("Please provide the vaild details", {
        status: 400,
      });
    }
    const passwordHash = await hashPassword(password);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        interestedIn: [],
      },
    });

    createJWTandCookie(user?.id);
    return NextResponse.json(user);
  } catch (err) {
    return new NextResponse("Signup Error", {status: 500});
  }
}
