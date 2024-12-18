import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { generateVerificationToken, generateVerificationEmail, sendEmail } from '@/lib/email'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { email, password, name, provider } = await request.json()
    console.log('Registration attempt for email:', email, 'with provider:', provider)

    // Test database connection
    try {
      await prisma.$connect()
      console.log('Database connection successful')
    } catch (error) {
      console.error('Database connection error:', error)
      throw new Error('Database connection failed')
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    // If user exists and trying to register with Google, return success
    if (existingUser && provider === 'google') {
      return NextResponse.json({ success: true })
    }

    // If user exists and trying to register with credentials, return error
    if (existingUser) {
      console.log('User already exists:', email)
      return NextResponse.json(
        { error: 'This email is already registered. Please try signing in instead.' },
        { status: 400 }
      )
    }

    // For Google registration, create user without password
    if (provider === 'google') {
      const user = await prisma.user.create({
        data: {
          email,
          name,
          emailVerified: new Date(),
          role: 'user',
        },
      })
      console.log('Google user created:', { id: user.id, email: user.email })
      return NextResponse.json({ success: true })
    }

    // For credentials registration
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'user',
      },
    })
    console.log('Credentials user created:', { id: user.id, email: user.email })

    // Generate and send verification email for credentials users
    console.log('Generating verification token for user:', user.id)
    const token = await generateVerificationToken(user.id)
    console.log('Token generated:', token.substring(0, 10) + '...')

    const emailData = generateVerificationEmail(email, token)
    await sendEmail(emailData)
    console.log('Verification email sent to:', email)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
