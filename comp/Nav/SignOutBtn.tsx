"use client";

import { signOut } from "next-auth/react";

function SignOutBtn() {
  return (
    <button
      className="text-sm bg-slate-900 text-white hover:bg-slate-700 transition-colors"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  )
}

export default SignOutBtn