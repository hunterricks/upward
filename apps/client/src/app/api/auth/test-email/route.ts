import { NextResponse } from 'next/server'
import { generateVerificationToken, generateVerificationEmail, sendEmail } from '@/lib/email'

export async function GET() {
  try {
    // This is just for testing - in production, we'll get the user ID from the session
    const testUserId = 'test-user-id'
    const testEmail = 'your-email@example.com' // Replace with your email for testing

    // Generate a verification token
    const token = await generateVerificationToken(testUserId)

    // Generate and send the verification email
    const emailData = generateVerificationEmail(testEmail, token)
    await sendEmail(emailData)

    return NextResponse.json({ 
      success: true, 
      message: 'Verification email sent successfully' 
    })
  } catch (error: any) {
    console.error('Test email error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}
