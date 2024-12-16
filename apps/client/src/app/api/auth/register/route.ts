import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { generateVerificationToken, generateVerificationEmail, sendEmail } from '@/lib/email'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()
    console.log('Registration attempt for email:', email)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      console.log('User already exists:', email)
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    console.log('Creating new user:', email)
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'user',
      },
    })
    console.log('User created:', { id: user.id, email: user.email })

    // Generate and send verification email
    console.log('Generating verification token for user:', user.id)
    const token = await generateVerificationToken(user.id)
    console.log('Token generated:', token.substring(0, 10) + '...')
    
    const emailData = generateVerificationEmail(email, token)
    console.log('Sending verification email to:', email)
    await sendEmail(emailData)
    console.log('Verification email sent')

    return NextResponse.json({
      success: true,
      message: 'Registration successful',
    })
  } catch (error: any) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}
