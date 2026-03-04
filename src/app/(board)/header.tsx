"use client";

import { Input } from "@/components/input";
import { authClient } from "@/lib/auth-client";
import { Loader2, LogInIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import { debounce, parseAsString, useQueryState } from "nuqs";
import { ChangeEvent } from "react";

export function Header() {
  const { data: session, isPending } = authClient.useSession();
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));

  function handleSearchUpdate(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value, {
      limitUrlUpdates: event.target.value !== "" ? debounce(500) : undefined,
    });
  }

  async function handleSignIn() {
    await authClient.signIn.social({ provider: "github", callbackURL: "/" });
  }

  async function handleSignOut() {
    await authClient.signOut();
  }

  return (
    <div className="max-w-225 mx-auto w-full flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="font-semibold text-xl">Product Roadmap</h1>
        <p className="text-sm text-navy-100">
          Follow the development progress of our entire platform
        </p>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <div className="relative">
          <SearchIcon className="absolute size-4 text-navy-200 left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            value={search}
            onChange={handleSearchUpdate}
            className="pl-10"
          />
        </div>

        {isPending ? (
          <div
            className={`size-8 rounded-full bg-navy-700 border border-navy-500 
                flex cursor-pointer items-center justify-center`}
          >
            <Loader2 className="size-3.5 text-navy-200 animate-spin" />z
          </div>
        ) : session?.user ? (
          <div
            onClick={handleSignOut}
            className={`size-8 rounded-full overflow-hidden bg-navy-700 border border-navy-500 flex cursor-pointer
              items-center justify-center hover:bg-navy-600 transition-colors duration-150`}
          >
            <Image
              src={session.user.image ?? ""}
              alt={session.user.name}
              height={32}
              width={32}
              className="rounded-full"
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={handleSignIn}
            className={`size-8 rounded-full bg-navy-700 border border-navy-500 flex cursor-pointer
              items-center justify-center hover:bg-navy-600 transition-colors duration-150`}
          >
            <LogInIcon className="size-3.5 text-navy-200" />
          </button>
        )}
      </div>
    </div>
  );
}
