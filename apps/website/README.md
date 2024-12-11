# UPWARD™ Website

The public-facing website for UPWARD™ design and development studio. This application showcases our services, work, and expertise through a modern and engaging interface.

## Features

### Homepage
- Dynamic hero slider
- Featured projects
- Service overview
- Client testimonials

### Content Pages
- About page
- Services detail pages
- Blog with Sanity CMS integration
- Portfolio showcase
- Contact form

### Technical Features
- Server-side rendering with Next.js
- Content management with Sanity
- Responsive design
- SEO optimization
- Performance optimization

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-token
NEXT_PUBLIC_SANITY_API_VERSION=2023-12-11
```

## Project Structure

```
src/
  ├── app/              # App router pages and layouts
  ├── components/       # React components
  ├── lib/             # Utility functions and Sanity client
  └── sanity/          # Sanity schema and configuration
```

## Content Management

This website uses Sanity CMS for content management. To access the Sanity Studio:

1. Run `pnpm dev` in the sanity directory
2. Visit `http://localhost:3333`
3. Log in with your Sanity credentials

## Contributing

1. Follow the TypeScript conventions
2. Use the shared UI components from `@upward/ui`
3. Maintain consistent styling with Tailwind CSS
4. Write meaningful commit messages
