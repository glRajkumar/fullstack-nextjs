"use client";

import { signIn } from "next-auth/react";

function AuthProviderBtns() {
  return (
    <div className="dc gap-6">
      <button
        className="df py-2 bg-slate-200"
        onClick={() => signIn("google", { callbackUrl: "http://localhost:3000" })}
      >
        <img className="w-6 h-6" src="./img/google.webp" alt="" />
        Google
      </button>

      <button
        className="df py-2 bg-slate-200"
        onClick={() => signIn("github", { callbackUrl: "http://localhost:3000" })}
      >
        <img className="w-6 h-6" src="./img/github.png" alt="" />
        Github
      </button>
    </div>
  )
}

export default AuthProviderBtns