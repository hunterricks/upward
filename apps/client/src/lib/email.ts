import { Resend } from 'resend'
import { randomBytes } from 'crypto'
import { prisma } from './prisma'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set in environment variables')
}

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to,
      subject,
      html
    })
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Failed to send email')
  }
}

export async function generateVerificationToken(userId: string): Promise<string> {
  console.log('Generating verification token for user:', userId)
  const token = randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

  console.log('Creating verification token in database:', {
    token: token.substring(0, 10) + '...',
    userId,
    expires
  })

  const verificationToken = await prisma.verificationToken.create({
    data: {
      token,
      userId,
      expires,
    },
  })

  console.log('Verification token created:', {
    id: verificationToken.id,
    token: token.substring(0, 10) + '...',
    expires: verificationToken.expires
  })

  return token
}

export async function verifyEmail(token: string): Promise<boolean> {
  console.log('Looking up verification token:', token.substring(0, 10) + '...')
  
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
    include: { user: true },
  })

  console.log('Verification token lookup result:', verificationToken ? {
    id: verificationToken.id,
    userId: verificationToken.userId,
    expires: verificationToken.expires,
    user: {
      id: verificationToken.user.id,
      email: verificationToken.user.email
    }
  } : 'Not found')

  if (!verificationToken) {
    console.log('Token not found in database')
    throw new Error('Invalid verification token')
  }

  if (verificationToken.expires < new Date()) {
    console.log('Token expired:', {
      expires: verificationToken.expires,
      now: new Date()
    })
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    })
    throw new Error('Verification token has expired')
  }

  console.log('Token valid, updating user and cleaning up...')
  await prisma.$transaction([
    // Update user email verification status
    prisma.user.update({
      where: { id: verificationToken.userId },
      data: { emailVerified: new Date() },
    }),
    // Delete the used token
    prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    }),
  ])

  console.log('Email verification completed successfully')
  return true
}

export function generateVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`

  return {
    to: email,
    subject: 'Verify your email address',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h1 style="color: #333; text-align: center;">Verify your email address</h1>
        <p style="color: #666; font-size: 16px; line-height: 1.5;">
          Thank you for signing up! Please verify your email address by clicking the button below:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}"
             style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Verify Email
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">
          If you didn't create an account, you can safely ignore this email.
        </p>
        <p style="color: #666; font-size: 14px;">
          This link will expire in 24 hours.
        </p>
      </div>
    `,
  }
}
