import Link from "next/link";

function Nav() {
  return (
    <nav className="df px-6 py-2 shadow sticky top-0 z-1 bg-white">
      <Link href="/" className="text-2xl font-medium">
        Post-It
      </Link>


    </nav>
  )
}

export default Nav