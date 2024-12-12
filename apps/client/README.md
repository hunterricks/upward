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

### Prerequisites
- Node.js 18+
- pnpm
- Cloudflared CLI (for tunnel access)

### Setup

```bash
# Install dependencies
pnpm install

# Generate Prisma client
pnpm prisma generate

# Run database migrations
pnpm prisma migrate dev
```

### Development Commands

```bash
# Start development server with Cloudflare tunnel (default)
# This will automatically:
# - Clean up any existing processes on required ports
# - Start the Next.js server on port 3000
# - Start the Cloudflare tunnel for remote access
pnpm dev

# Start development server locally only (no tunnel)
pnpm dev:local

# Build for production
pnpm build
```

### Development URLs
- Local: http://localhost:3000
- Remote: https://app.upwardwebdesign.com (via Cloudflare tunnel)

### Environment Variables
Make sure to set up your `.env` file with the following variables:
```env
# Base URL for NextAuth
NEXTAUTH_URL="https://app.upwardwebdesign.com"
NEXTAUTH_SECRET="your-secret-here"

# Database
DATABASE_URL="your-database-url"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Cloudflare Tunnel
The application uses Cloudflare Tunnel for secure remote access during development. The tunnel configuration is stored in `tunnel-config.yml` and is automatically started with the development server.

To manually manage the tunnel:
```bash
# View tunnel status
cloudflared tunnel list

# Start tunnel manually
cloudflared tunnel --config tunnel-config.yml run
```

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
