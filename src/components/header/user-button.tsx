'use client'

import { authClient } from "@/lib/auth-client";
import { Loader2, LogInIcon } from "lucide-react";
import Image from "next/image";

export function UserButton() {
  const { data: session, isPending } = authClient.useSession();

  async function handleSignIn() {
    await authClient.signIn.social({ provider: "github", callbackURL: "/" });
  }

  async function handleSignOut() {
    await authClient.signOut();
  }

  return (
    <>
      {isPending ? (
        <div
          className={`size-8 rounded-full bg-navy-700 border border-navy-500 
                flex cursor-pointer items-center justify-center`}
        >
          <Loader2 className="size-3.5 text-navy-200 animate-spin" />
        </div>
      ) : session?.user ? (
        <button
          type="button"
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
        </button>
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
    </>
  );
}
