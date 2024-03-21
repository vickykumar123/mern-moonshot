import Pagination from "@/components/Pagination";
import {getCategory} from "@/lib/pagination";
import {getCurrentUser} from "@/lib/user";

const PAGE_LIMIT = 6;
export default async function Dashboard({
  searchParams,
}: {
  searchParams: {page: string};
}) {
  const user = await getCurrentUser();
  const offset = parseInt(searchParams?.page) * PAGE_LIMIT;
  const {totalPages, totalCount, data} = await getCategory({
    offset,
    limit: PAGE_LIMIT,
  });

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
      <Pagination totalPages={totalPages} />
    </div>
  );
}
