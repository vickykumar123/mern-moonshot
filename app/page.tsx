import {getCurrentUser} from "@/lib/user";
import {redirect} from "next/navigation";

export default async function page() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/register");
  }
  return redirect("/dashboard");
}
