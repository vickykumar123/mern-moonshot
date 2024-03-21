"use client";

import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";
import {useCallback, useEffect} from "react";

interface IPagination {
  totalPages: number;
}

export default function Pagination({totalPages}: IPagination) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 0;

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
        <button>
          <Link
            href={createPageURL(currentPage - 1)}
            className={
              currentPage - 1 < 0 ? `pointer-events-none opacity-50` : ""
            }
          >
            left
          </Link>
        </button>
        <button>
          <Link
            href={createPageURL(currentPage + 1)}
            className={
              currentPage >= totalPages - 1
                ? `pointer-events-none opacity-50`
                : ""
            }
          >
            right
          </Link>
        </button>
      </div>
    </>
  );
}
