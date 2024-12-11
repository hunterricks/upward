# UPWARD Client Portal

The client portal for UPWARD design and development studio. This application provides a secure dashboard where clients can manage their projects and complete their onboarding process.

## Features

### Authentication
- Secure OAuth 2.0 authentication with Google and Apple Sign-in
- Email/password authentication with form validation
- Protected routes and session management
- Secure cookie-based sessions
- Modern, responsive authentication pages with split-screen layout
- Social sign-in buttons with branded styling

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

## Development

```bash
# Install dependencies
pnpm install

# Generate Prisma client
pnpm prisma generate

# Run database migrations
pnpm prisma migrate dev

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/upward_client"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret-key"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

APPLE_ID="your-apple-id"
APPLE_SECRET="your-apple-secret"
```

### OAuth Setup

#### Google OAuth
1. Go to the [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Configure the OAuth consent screen
6. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
7. Copy the client ID and secret to your `.env` file

#### Apple Sign In
1. Go to the [Apple Developer Console](https://developer.apple.com)
2. Register a new App ID if you haven't already
3. Enable "Sign In with Apple" capability
4. Create a Services ID and configure domains
5. Configure the return URL: `http://localhost:3000/api/auth/callback/apple`
6. Generate a key and download it
7. Copy the necessary credentials to your `.env` file

## Security

- All environment variables are git-ignored
- Sessions are encrypted using a secure secret key
- OAuth tokens are securely stored in the database
- Protected API routes and middleware for authenticated access
- CSRF protection enabled
- Secure cookie handling

## Database Schema

The application uses Prisma as the ORM with the following main models:
- User (for authentication and user data)
- Account (for OAuth provider accounts)
- Session (for managing user sessions)
- VerificationToken (for email verification)

For detailed schema information, see `prisma/schema.prisma`.

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

## UI Components

### Authentication Pages
- Modern split-screen layout with branded imagery
- Responsive design that works on all device sizes
- Form validation with error messages
- Loading states and success feedback
- Social sign-in buttons with brand colors
- Clean typography and spacing following design system

### Styling
- Built with Tailwind CSS for consistent styling
- Responsive design principles
- Dark mode support (coming soon)
- Custom animations and transitions
- Accessibility-first approach

## Contributing

1. Follow the TypeScript conventions
2. Use the shared UI components from `@upward/ui`
3. Maintain consistent styling with Tailwind CSS
4. Write meaningful commit messages
