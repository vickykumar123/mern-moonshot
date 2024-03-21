"use client";

import {ChevronLeft, ChevronRight} from "lucide-react";
import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";
import {useRouter} from "next/navigation";
import {useCallback, useEffect, useRef} from "react";

interface IPagination {
  totalPages: number;
}

export default function Pagination({totalPages}: IPagination) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let currentPage = Number(searchParams.get("page")) || 0;
  const router = useRouter();

  useEffect(() => {
    if (Number(searchParams.get("page")) > totalPages - 1) {
      const params = new URLSearchParams(searchParams);
      params.set("page", "0");
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [searchParams, totalPages, pathname, router]);

  const createPageURL = useCallback(
    (pageNumber: number | string) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", pageNumber.toString());
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams]
  );

  return (
    <>
      <div className="flex items-center justify-between space-x-3">
        <button className="hover:bg-gray-300/30 p-1 rounded-md">
          <Link
            href={createPageURL(currentPage - 1)}
            className={
              currentPage - 1 < 0
                ? `pointer-events-none opacity-50 flex`
                : "flex"
            }
          >
            <ChevronLeft /> Previous
          </Link>
        </button>
        <button className="hover:bg-gray-300/30 p-1 rounded-md">
          <Link
            href={createPageURL(currentPage + 1)}
            className={
              currentPage >= totalPages - 1
                ? `pointer-events-none opacity-50 flex cursor-not-allowed`
                : "flex"
            }
          >
            Next <ChevronRight />
          </Link>
        </button>
      </div>
    </>
  );
}
