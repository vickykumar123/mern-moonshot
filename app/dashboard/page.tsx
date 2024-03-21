import {getCurrentUser} from "@/lib/user";

export default async function page() {
  const user = await getCurrentUser();
  return <div>dashboard</div>;
}
