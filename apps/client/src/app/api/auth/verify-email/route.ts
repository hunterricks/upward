import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/rate-limit'

// Rate limiter: 5 attempts per minute per token
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
})

export async function GET(request: NextRequest) {
  console.log('Verify email API called')
  try {
    // Test database connection
    try {
      await prisma.$connect()
      console.log('Database connection successful')
    } catch (error) {
      console.error('Database connection error:', error)
      throw new Error('Database connection failed')
    }

    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get('token')
    console.log('Token received:', token ? token.substring(0, 10) + '...' : 'none')

    if (!token) {
      console.log('No token provided')
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      )
    }

    // Apply rate limiting based on the token
    await limiter.check(5, `verify_email_${token}`)

    // Find and verify token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
      include: { user: true }
    })
    console.log('Token exists in database:', verificationToken ? 'Yes' : 'No')
    
    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Invalid verification token' },
        { status: 400 }
      )
    }

    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({
        where: { id: verificationToken.id },
      })
      return NextResponse.json(
        { error: 'Verification token has expired' },
        { status: 400 }
      )
    }

    // Update user and delete token
    await prisma.$transaction([
      prisma.user.update({
        where: { id: verificationToken.userId },
        data: { emailVerified: new Date() },
      }),
      prisma.verificationToken.delete({
        where: { id: verificationToken.id },
      }),
    ])

    console.log('Email verified successfully')
    return NextResponse.json({ 
      success: true,
      message: 'Email verified successfully'
    })
  } catch (error: any) {
    if (error.message === 'Rate limit exceeded') {
      return NextResponse.json(
        { error: 'Too many verification attempts. Please try again later.' },
        { status: 429 }
      )
    }

    console.error('Email verification error:', error)
    
    return NextResponse.json(
      { 
        error: error.message || 'Verification failed',
        details: error.stack
      },
      { status: 400 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
