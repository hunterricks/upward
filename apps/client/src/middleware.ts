import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// List of public routes that don't require authentication
const publicRoutes = ['/', '/login', '/register']

// List of protected routes that require authentication
const protectedRoutes = ['/dashboard']

export default withAuth(
  function middleware(req: NextRequest) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl
        
        // Allow public routes
        if (publicRoutes.some(route => pathname.startsWith(route))) {
          return true
        }

        // Check if the route is protected
        const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

        // If it's a protected route, require authentication
        if (isProtectedRoute) {
          return !!token
        }

        // Allow other routes
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/auth/* (authentication routes)
     * 2. /_next/* (Next.js internals)
     * 3. /fonts/* (inside public directory)
     * 4. /images/* (inside public directory)
     * 5. /*.png, /*.jpg, etc. (static files)
     */
    "/((?!api/auth|_next|fonts|images|[\\w-]+\\.\\w+).*)",
  ],
}
