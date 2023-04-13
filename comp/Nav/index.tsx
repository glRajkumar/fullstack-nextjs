"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

function Nav() {
  const { status } = useSession()

  return (
    <nav className="df px-6 py-2 shadow sticky top-0 z-1 bg-white">
      <Link href="/" className="mr-auto text-2xl font-medium">
        Post-It
      </Link>

      {
        status !== "loading" && (
          status === "unauthenticated" ? <>
            <Link
              href="/signup"
              className="text-sm font-medium hover:text-blue-600"
            >
              Sign up
            </Link>

            <Link
              href="/login"
              className="px-4 py-1 text-sm bg-slate-900 text-white hover:bg-slate-700 transition-colors rounded-md"
            >
              Log in
            </Link>
          </>
            :
            <button
              className="text-sm bg-slate-900 text-white hover:bg-slate-700 transition-colors"
              onClick={() => signOut()}
            >
              Sign out
            </button>
        )
      }
    </nav>
  )
}

export default Nav