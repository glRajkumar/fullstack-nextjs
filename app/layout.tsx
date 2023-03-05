import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import './globals.css';

import Nav from '@/comp/Nav';

type props = {
  children: React.ReactNode
}

async function RootLayout({ children }: props) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <head />
      <body>
        {session?.user && <Nav />}
        {children}
      </body>
    </html>
  )
}

export default RootLayout