import { getServerSession } from "next-auth";
import Link from "next/link";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import SignOutBtn from "./SignOutBtn";

async function Nav() {
  const session = await getServerSession(authOptions)

  return (
    <nav className="df px-6 py-2 shadow sticky top-0 z-1 bg-white">
      <Link href="/" className="mr-auto text-2xl font-medium">
        Post-It
      </Link>

      {session?.user?.name}
      <SignOutBtn />
    </nav>
  )
}

export default Nav