import { NextRequest, NextResponse } from 'next/server'
import { verifyEmail } from '@/lib/email'

export async function GET(request: NextRequest) {
  console.log('Verify email API called')
  try {
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get('token')
    console.log('Token received:', token)

    if (!token) {
      console.log('No token provided')
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      )
    }

    console.log('Attempting to verify email with token')
    await verifyEmail(token)
    console.log('Email verified successfully')

    // Return JSON response instead of redirect
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Email verification error:', error)
    
    return NextResponse.json(
      { error: error.message || 'Verification failed' },
      { status: 400 }
    )
  }
}
