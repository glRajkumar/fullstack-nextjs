import './globals.css';
import Nav from './Nav';

type props = {
  children: React.ReactNode
}

function RootLayout({ children }: props) {
  return (
    <html lang="en">
      <head />
      <body>
        <Nav />
        {children}
      </body>
    </html>
  )
}

export default RootLayout