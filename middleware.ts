//  *** Example 1 - custom middleware ***
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { getToken } from 'next-auth/jwt';

// const secret = process.env.NEXTAUTH_SECRET

// export async function middleware(req: NextRequest) {
//   const session = await getToken({ req, secret })
//   console.log("session", session)
//   return NextResponse.next()
// }

// export const config = {
//   matcher: ["/api/posts/:path*"],
// }


// *** Example 2 - defualt middleware given by net-auth ***
// export { default } from "next-auth/middleware"

// export const config = {
//   matcher: ["/api/posts/:path*"],
// }


// *** Example 3 - custom middleware with next-auth ***
// import { withAuth } from "next-auth/middleware"

// export default withAuth(
//   function middleware(req) {
//     console.log("token in middle")
//     console.log(req.nextauth.token)
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token,
//     },
//   }
// )

// export const config = {
//   matcher: ["/api/posts/:path*"],
// }



import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret })

  if (req.nextUrl.pathname === "/api/posts" && req.method === "GET") {
    return NextResponse.next()
  }

  if (session) {
    const headers = new Headers(req.headers)
    headers.set('userid', session.id as string)

    return NextResponse.next({
      request: { headers },
    })
  }

  return new NextResponse(
    JSON.stringify({ message: 'Authentication failed' }),
    { status: 401, headers: { 'content-type': 'application/json' } }
  )
}

export const config = {
  matcher: ["/api/posts/:path*", "/api/comments/:path*"],
}
