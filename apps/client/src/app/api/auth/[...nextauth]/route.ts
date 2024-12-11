import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import AppleProvider from "next-auth/providers/apple"

const prisma = new PrismaClient()

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID!,
      clientSecret: process.env.APPLE_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
  callbacks: {
    async session({ session, user }) {
      // Add user ID and company name to session
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          companyName: user.companyName,
        },
      }
    },
    async signIn({ user, account, profile }) {
      // Allow sign in
      return true
    },
  },
  events: {
    async signIn(message) {
      // Handle sign in event
    },
    async createUser(message) {
      // Handle new user creation
    },
  },
})

export { handler as GET, handler as POST }
