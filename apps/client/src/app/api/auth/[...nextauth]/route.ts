import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import AppleProvider from "next-auth/providers/apple"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { rateLimit } from "@/lib/rate-limit"
import { generateVerificationToken, generateVerificationEmail, sendEmail } from '@/lib/email'

const prisma = new PrismaClient()

// Rate limiter: 5 attempts per minute
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500
})

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID ?? '',
      clientSecret: process.env.APPLE_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        try {
          // Apply rate limiting
          await limiter.check(10, credentials.email)
        } catch {
          throw new Error('Too many login attempts. Please try again later.')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password) {
          throw new Error('User not found')
        }

        const isValid = await bcrypt.compare(credentials.password, user.password)

        if (!isValid) {
          throw new Error('Invalid password')
        }

        return user
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/auth/error',
    verifyRequest: '/verify-request',
    newUser: '/dashboard'
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Allow OAuth providers to sign in
      if (account?.provider === 'google' || account?.provider === 'apple') {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
          include: { accounts: true }
        })

        // If no user exists, allow sign in (new user)
        if (!existingUser) {
          return true
        }

        // If user exists and has an account with this provider, allow sign in
        if (existingUser.accounts.some(acc => acc.provider === account.provider)) {
          return true
        }

        // If user exists but has no password (OAuth-only user), allow linking
        if (!existingUser.password) {
          return true
        }

        // If user exists with password, prevent OAuth sign in
        return false
      }

      // For credentials, proceed with normal flow
      return true
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.emailVerified = user.emailVerified
      }
      if (account) {
        token.accessToken = account.access_token
        token.provider = account.provider
      }

      // Check if user still exists
      const userExists = await prisma.user.findUnique({
        where: { id: token.id as string },
      })

      if (!userExists) {
        return null // This will force a session end
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.emailVerified = token.emailVerified as Date
        session.provider = token.provider as string
      }
      return session
    }
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      if (isNewUser && account?.provider === 'google') {
        // Update user with additional info for new Google users
        await prisma.user.update({
          where: { id: user.id },
          data: {
            emailVerified: new Date(),
            role: 'user'
          }
        })
      }
    },
    async createUser({ user }) {
      console.log('CreateUser event:', user)
    }
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
