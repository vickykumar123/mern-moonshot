import {getUser} from "@/lib/user";

export default async function page() {
  const user = await getUser();
  console.log(user);
  return <div>dashboard</div>;
}
