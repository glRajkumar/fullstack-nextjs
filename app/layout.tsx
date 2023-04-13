// global styles
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

import ClientWrapper from "@/comp/Common/ClientWrapper";
import Nav from '@/comp/Nav';

type props = {
  children: React.ReactNode
}

async function RootLayout({ children }: props) {
  return (
    <html lang="en">
      <head />
      <body>
        <ClientWrapper>
          <Nav />
          {children}
        </ClientWrapper>
      </body>
    </html>
  )
}

export default RootLayout