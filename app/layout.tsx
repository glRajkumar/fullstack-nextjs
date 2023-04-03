import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// global styles
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

import ClientWrapper from "@/comp/Common/ClientWrapper";
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
        <ClientWrapper>
          {session?.user && <Nav />}
          {children}
        </ClientWrapper>
      </body>
    </html>
  )
}

export default RootLayout