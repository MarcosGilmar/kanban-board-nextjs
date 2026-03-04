"use client";

import { LogInIcon } from "lucide-react";
import { debounce, parseAsString, useQueryState } from "nuqs";
import { ChangeEvent } from "react";

export function Header() {
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));

  function handleSearchUpdate(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value, {
      limitUrlUpdates: event.target.value !== "" ? debounce(500) : undefined,
    });
  }

  return (
    <header className="max-w-225 mx-auto w-full flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="font-semibold text-xl">Product Roadmap</h1>
        <p className="text-sm text-navy-100">
          Follow the development progress of our entire platform
        </p>
      </div>

      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-row gap-2">
          <input
            placeholder="Search for features..."
            className={`flex h-10 bg-navy-900 border-[0.5px] border-navy-500
                placeholder-navy-200 pl-4 pr-3 rounded-lg text-sm text-navy-50
                outline-none focus-visible:ring-2 focus-visible:ring-navy-400 
                focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950`}
            value={search}
            onChange={handleSearchUpdate}
          />

          <button
            type="button"
            className={`size-8 rounded-full bg-navy-700 border border-navy-500 flex cursor-pointer
            items-center justify-center hover:bg-navy-600 transition-colors duration-150`}
          >
            <LogInIcon className="size-3.5 text-navy-200" />
          </button>
        </div>
      </div>
    </header>
  );
}
