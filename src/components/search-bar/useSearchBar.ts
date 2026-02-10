"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type UseSearchBarOptions = {
  debounceMs?: number;
};

export function useSearchBar({ debounceMs = 350 }: UseSearchBarOptions = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") ?? "";
  const [value, setValue] = useState(queryParam);

  useEffect(() => {
    setValue(queryParam);
  }, [queryParam]);

  useEffect(() => {
    if (value === queryParam) {
      return;
    }

    const handle = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value.trim().length > 0) {
        params.set("q", value.trim());
      } else {
        params.delete("q");
      }

      const queryString = params.toString();
      const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(nextUrl, { scroll: false });
    }, debounceMs);

    return () => clearTimeout(handle);
  }, [debounceMs, pathname, queryParam, router, searchParams, value]);

  return {
    value,
    setValue,
  };
}
