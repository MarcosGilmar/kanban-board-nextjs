"use client";

import { Input } from "@/components/input";
import { SearchIcon } from "lucide-react";
import { debounce, parseAsString, useQueryState } from "nuqs";
import { ChangeEvent } from "react";

export function SearchInput() {
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault("").withOptions({ shallow: false }));

  function handleSearchUpdate(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value, {
      limitUrlUpdates: event.target.value !== "" ? debounce(500) : undefined,
    });
  }
  return (
    <div className="relative">
      <SearchIcon className="absolute size-4 text-navy-200 left-3.5 top-1/2 -translate-y-1/2" />
      <Input value={search} onChange={handleSearchUpdate} className="pl-10" />
    </div>
  );
}
