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
- PostgreSQL 14+
- Cloudflared CLI (for tunnel access)

### Setup

1. Install dependencies:
```bash
pnpm install
```

2. Set up your PostgreSQL database:
```bash
# Create the database if it doesn't exist
createdb upward_client
```

3. Set up your environment variables in `.env`:
```env
# Database
DATABASE_URL="postgresql://username@localhost:5432/upward_client"

# NextAuth
NEXTAUTH_URL="https://app.upwardwebdesign.com"  # Use http://localhost:3002 for local-only development
NEXTAUTH_SECRET="your-secret-here"

# OAuth Provider
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Configure the OAuth consent screen
6. Add authorized redirect URIs:
   - `http://localhost:3002/api/auth/callback/google` (for local development)
   - `https://app.upwardwebdesign.com/api/auth/callback/google` (for production)
7. Add authorized JavaScript origins:
   - `http://localhost:3002` (for local development)
   - `https://app.upwardwebdesign.com` (for production)
8. Copy the client ID and secret to your `.env` file

### Development Commands

```bash
# Start development server with Cloudflare tunnel (default)
# This will automatically:
# - Clean up any existing processes on required ports
# - Start the Next.js server on port 3002
# - Start the Cloudflare tunnel for remote access
pnpm dev

# Start development server locally only (no tunnel)
pnpm dev:local

# Build for production
pnpm build

# Start production server
pnpm start
```

### Development URLs
- Local development: http://localhost:3002
- Remote access: https://app.upwardwebdesign.com (via Cloudflare tunnel)

### Cloudflare Tunnel
The application automatically starts a Cloudflare tunnel when using `pnpm dev`. This provides:
- Secure remote access to your local development server
- Proper OAuth callback handling for remote testing
- Automatic port management and cleanup

The tunnel configuration is stored in `tunnel-config.yml`. You can also manage the tunnel manually:
```bash
# View tunnel status
cloudflared tunnel list

# Start tunnel manually (if needed)
cloudflared tunnel --config tunnel-config.yml run
```

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
- User: Authentication and user profile
- Account: OAuth provider accounts
- Session: User sessions
- VerificationToken: Email verification

## Security

- All routes except public pages (/login, /register) require authentication
- Sessions are managed using JWT strategy
- OAuth 2.0 for secure third-party authentication
- Database credentials and secrets are managed through environment variables
- Automatic port cleanup before development server starts
- Secure tunnel configuration for remote access

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request
