import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const prisma = new PrismaClient()

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
      }
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // After sign in, redirect to dashboard
      if (url === '/api/auth/signin' || url === '/login' || url === '/register') {
        return `${baseUrl}/dashboard`
      }
      // If the url starts with baseUrl, allow it
      if (url.startsWith(baseUrl)) {
        return url
      }
      // For relative URLs, prefix with baseUrl
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      }
      // Default to dashboard
      return `${baseUrl}/dashboard`
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      if (isNewUser) {
        try {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              name: profile?.name ?? user.name,
            },
          })
        } catch (error) {
          console.error('Error updating user profile:', error)
        }
      }
    },
  },
  debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
