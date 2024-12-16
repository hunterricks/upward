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
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    error: '/login',
    verifyRequest: '/verify-request',
    newUser: '/onboarding'
  },
  callbacks: {
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
      if (!token) {
        return null // User was deleted, end session
      }

      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.emailVerified = token.emailVerified as Date
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
      // Default to baseUrl
      return baseUrl
    }
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      if (isNewUser) {
        // Update user with additional info
        await prisma.user.update({
          where: { id: user.id },
          data: {
            role: 'user',
            emailVerified: account?.provider === 'credentials' ? null : new Date(),
          }
        })

        // If email provider, send verification email
        if (account?.provider === 'credentials' && user.email) {
          try {
            const token = await generateVerificationToken(user.id)
            const emailData = generateVerificationEmail(user.email, token)
            await sendEmail(emailData)
          } catch (error) {
            console.error('Error sending verification email:', error)
          }
        }
      }
    },
    async createUser({ user }) {
      // Set default role for new users
      await prisma.user.update({
        where: { id: user.id },
        data: { role: 'user' }
      })
    }
  },
  debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
