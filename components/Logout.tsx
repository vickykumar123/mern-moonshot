"use client";
import {trpc} from "@/trpc/client";
import {useRouter} from "next/navigation";

export default function Logout() {
  const router = useRouter();
  const {mutate} = trpc.auth.logout.useMutation({
    onSuccess: () => {
      router.replace("/register");
      router.refresh();
    },
  });
  async function handleLogout() {
    mutate();
  }
  return (
    <button onClick={handleLogout} className="hover:underline">
      Logout
    </button>
  );
}
