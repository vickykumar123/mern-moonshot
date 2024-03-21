import Categories from "@/components/Categories";
import Pagination from "@/components/Pagination";
import {createCategory} from "@/lib/categoryData";
import {getCategory} from "@/lib/pagination";
import {getCurrentUser} from "@/lib/user";
import {useEffect} from "react";

const PAGE_LIMIT = 6;
export default async function Dashboard({
  searchParams,
}: {
  searchParams: {page: string};
}) {
  const user = await getCurrentUser();
  // await createCategory();

  const offset = parseInt(searchParams.page) * PAGE_LIMIT || 0;
  const {totalPages, totalCount, data} = await getCategory({
    offset,
    limit: PAGE_LIMIT,
  });

  // console.log(offset);
  return (
    <div>
      <Categories data={data} interestedIn={user?.interestedIn} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
