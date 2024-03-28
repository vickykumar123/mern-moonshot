import Categories from "@/components/Categories";
import {createCategory} from "@/lib/categoryData";
import {getCurrentUser} from "@/lib/user";
import {trpc} from "@/trpc/client";
import {redirect} from "next/navigation";

const PAGE_LIMIT = 6;
export default async function Dashboard({
  searchParams,
}: {
  searchParams: {page: string};
}) {
  const user = await getCurrentUser();
  // await createCategory();
  if (!user) {
    return redirect("/register");
  }

  const offset = parseInt(searchParams.page) * PAGE_LIMIT || 0;

  return (
    <div>
      <Categories
        offset={offset}
        limit={PAGE_LIMIT}
        interestedIn={user?.interestedIn}
      />
    </div>
  );
}
