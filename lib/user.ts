import {cookies} from "next/headers";
import {verifyJWT} from "./JWTandCookie";
import {db} from "./db";

export async function getCurrentUser() {
  const session = cookies().get("token")?.value;
  if (!session) return;
  const userId = verifyJWT(session!);

  const user = await db.user.findUnique({
    where: {
      // @ts-ignore
      id: userId._id,
    },
    select: {
      name: true,
      email: true,
      password: false,
    },
  });

  return user;
}
