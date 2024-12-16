# Authentication System Documentation

## Overview
The UPWARD authentication system provides a secure, flexible, and feature-rich authentication solution built on NextAuth.js. It supports multiple authentication providers, role-based access control, and enhanced security features.

## Features

### Multiple Authentication Methods
- Google Sign-In
- Apple Sign-In
- Email/Password Authentication

### Security Features
- Password Strength Validation
  - Minimum length requirements
  - Character complexity checks
  - Common pattern detection
  - Sequential character detection
- Rate Limiting (5 attempts per minute)
- Secure Password Hashing (bcrypt)
- JWT Session Management

### User Management
- Role-Based Access Control (RBAC)
- Email Verification Status
- User Profile Management
- Creation and Update Timestamps

## Setup Instructions

### Environment Variables
Create a `.env` file in the root directory with:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/upward_db
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
APPLE_ID=your-apple-id
APPLE_SECRET=your-apple-secret
```

### OAuth Provider Setup
- **Google**
  1. Go to [Google Cloud Console](https://console.cloud.google.com)
  2. Create a new project or select existing one
  3. Enable Google Sign-In API
  4. Create OAuth 2.0 credentials
  5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

- **Apple**
  1. Go to [Apple Developer Portal](https://developer.apple.com)
  2. Register your app and enable Sign in with Apple
  3. Create Service ID and configure domains
  4. Generate client secret
  5. Add redirect URI: `http://localhost:3000/api/auth/callback/apple`

### Database Setup
```bash
pnpm prisma generate
pnpm prisma db push
```

## Usage Examples

### Sign In with OAuth
```typescript
import { signIn } from 'next-auth/react'

// Google Sign In
await signIn('google', {
  callbackUrl: '/dashboard',
  redirect: true,
})

// Apple Sign In
await signIn('apple', {
  callbackUrl: '/dashboard',
  redirect: true,
})
```

### Email/Password Authentication
```typescript
await signIn('credentials', {
  email: 'user@example.com',
  password: 'secure-password',
  redirect: true,
  callbackUrl: '/dashboard'
})
```

### Protected Routes
```typescript
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }
  
  // Protected route logic here
}
```

## Security Best Practices

1. **Password Security**
   - Enforce strong password requirements
   - Use bcrypt for password hashing
   - Implement rate limiting for login attempts

2. **Session Management**
   - Use secure session cookies
   - Implement proper session expiration
   - Validate session tokens

3. **Error Handling**
   - Use generic error messages
   - Log detailed errors server-side
   - Implement proper error boundaries

## Troubleshooting

1. **OAuth Sign-In Issues**
   - Verify environment variables are set correctly
   - Check OAuth provider configuration
   - Validate redirect URIs

2. **Database Connection Issues**
   - Verify DATABASE_URL is correct
   - Check database server is running
   - Run migrations if needed

3. **Session Issues**
   - Clear browser cookies
   - Verify NEXTAUTH_SECRET is set
   - Check NEXTAUTH_URL matches deployment URL

## Future Enhancements

1. **Planned Features**
   - Email verification flow
   - Password reset functionality
   - Two-factor authentication (2FA)
   - Session management dashboard

2. **Security Improvements**
   - Enhanced rate limiting
   - IP-based blocking
   - Security event logging

For additional support or feature requests, please create an issue in the repository.
