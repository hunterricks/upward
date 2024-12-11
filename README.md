# UPWARD™ Monorepo

This monorepo contains all the applications and shared packages for UPWARD™, powered by Turborepo.

## Project Structure

```
apps/
  ├── website/      # Agency website (Homepage, About, Blog, etc.)
  ├── client/       # Client portal (Project Management, Onboarding)
  ├── mobile/       # Mobile app for client portal
  └── admin/        # Admin dashboard for client management
packages/
  └── ui/           # Shared UI components and design system
```

## Applications

### Website (apps/website)
The public-facing agency website that showcases UPWARD™'s services, work, and brand. Features include:
- Homepage with dynamic hero slider
- About page
- Blog
- Portfolio
- Contact

### Client Portal (apps/client)
A secure dashboard where clients can manage their projects and get onboarded. Features include:
- Client onboarding
- Project management dashboard
- File sharing
- Communication tools
- Progress tracking

### Mobile App (apps/mobile)
The mobile version of the client portal, built with React Native. Features include:
- Native mobile experience
- Push notifications
- Project status updates
- File viewing
- Quick communication
- Offline capabilities

### Admin Dashboard (apps/admin)
The administrative interface for managing clients and projects. Features include:
- Client management
- Project oversight
- Team collaboration
- Client communication hub
- Analytics and reporting
- Content management
- System settings
- User permissions

## Technology Stack

- Build System: Turborepo
- Package Manager: pnpm
- Web Framework: Next.js 14
- Mobile Framework: React Native
- CMS: Sanity
- Styling: Tailwind CSS, React Native StyleSheet
- UI Components: Custom design system
- Type System: TypeScript
- Database: Prisma (coming soon)
- Authentication: NextAuth.js

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start development servers:
   ```bash
   # Run all apps
   pnpm dev
   
   # Run specific app
   pnpm --filter @upward/website dev
   pnpm --filter @upward/client dev
   pnpm --filter @upward/mobile dev
   pnpm --filter @upward/admin dev
   ```

3. Build all apps:
   ```bash
   pnpm build
   ```

## Requirements

- Node.js >= 18
- pnpm >= 8
- iOS development setup (Xcode) for iOS development
- Android development setup (Android Studio) for Android development

## Environment Variables

Each application may require its own environment variables. Check the respective README files in each app directory for specific requirements.

## Application Architecture

```
┌─────────────┐     ┌─────────────┐
│   Website   │     │    Admin    │
│  (Next.js)  │     │  (Next.js)  │
└─────────────┘     └─────────────┘
                          │
                    ┌─────┴─────┐
                    │  Database  │
                    └─────┬─────┘
              ┌────────────────────┐
              │                    │
        ┌─────┴─────┐      ┌──────┴─────┐
        │   Client   │      │   Mobile   │
        │  (Next.js) │      │(React Native)
        └───────────┘       └────────────┘
