import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
  try {
    cookies().set("token", "");
    return NextResponse.json({status: "success"});
  } catch (error) {
    return new NextResponse("Logout Error", {status: 500});
  }
}
