# UPWARD Client Portal

The client portal for UPWARD design and development studio. This application provides a secure dashboard where clients can manage their projects and complete their onboarding process.

## Features

### Authentication
- Secure OAuth 2.0 authentication with Google and Apple Sign-in
- Email/password authentication with form validation and email verification
- Protected routes and session management
- Secure cookie-based sessions
- Modern, responsive authentication pages with split-screen layout
- Social sign-in buttons with branded styling
- Automatic email verification for OAuth providers
- Manual email verification for credentials-based registration

### Client Onboarding
- Guided onboarding process
- Brand questionnaire
- Asset collection
- Project requirements gathering

### Project Dashboard
- Project timeline and milestones
- Task tracking
- File sharing and asset management
- Communication hub
- Progress updates

### Client Tools
- Invoice management
- Meeting scheduler
- Document signing
- Feedback system

## Recent Updates
- [2024-12-16] Enhanced Authentication System
  - Added email verification system using Resend
  - Implemented Google OAuth integration
  - Added automatic verification for OAuth users
  - Improved error handling and user feedback
  - Added rate limiting for verification attempts
- [2024-12-16] Initial database setup completed with PostgreSQL and Prisma
  - Added User, Account, Session, and VerificationToken models
  - Database running in Docker container on port 5433
  - Migrations system initialized

## Development Setup

### Prerequisites
- Docker
- Node.js >= 18
- pnpm >= 8

### Environment Variables
Create a `.env.local` file in the client app directory with the following variables:
```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/upward_db

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
APPLE_ID=your-apple-id
APPLE_SECRET=your-apple-secret

# Email Service
RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=your-verified-email@domain.com
```

### Database Setup
The application uses PostgreSQL running in Docker. The database will be automatically started when running `pnpm dev`.

Manual database commands:
```bash
# Start the database container
./scripts/start-docker.sh

# Run migrations
pnpm prisma migrate dev

# Reset database
pnpm prisma migrate reset

# Open Prisma Studio
pnpm prisma studio
```

### Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Generate Prisma client and run migrations:
```bash
pnpm prisma generate
pnpm prisma migrate dev
```

3. Start the development server:
```bash
pnpm dev
```

This will:
- Clean up any existing processes on required ports
- Start Docker and PostgreSQL if not running
- Run database migrations if needed
- Start the Next.js development server
- Start the Cloudflare tunnel for HTTPS

The application will be available at:
- Local: http://localhost:3000

### Authentication Flow

The application supports two authentication methods:

1. **OAuth (Google, Apple)**
   - Click the provider button
   - Authenticate with the provider
   - Automatically verified and logged in
   - Redirected to dashboard

2. **Email/Password**
   - Register with email and password
   - Receive verification email
   - Click verification link
   - Log in with credentials
   - Redirected to dashboard

### Security Features

- Rate limiting on authentication endpoints
- Secure password hashing with bcrypt
- JWT-based session management
- CSRF protection
- HTTP-only cookies
- Automatic session invalidation for deleted users

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes including NextAuth configuration
│   ├── login/            # Login page with split-screen layout
│   ├── register/         # Registration page with split-screen layout
│   └── page.tsx          # Landing page
├── components/
│   ├── auth/             # Authentication components
│   │   └── auth-form.tsx # Shared authentication form component
│   └── providers/        # React context providers
├── middleware.ts         # NextAuth middleware for route protection
└── styles/              # Global styles and Tailwind configuration
```

## Database Schema

The application uses Prisma with PostgreSQL. Key models include:
- User: Core user information
- Account: OAuth accounts linked to users
- Session: User sessions
- VerificationToken: Email verification tokens

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request
