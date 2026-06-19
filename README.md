# shadcn/ui monorepo template

This is a Next.js monorepo template with shadcn/ui.

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Using components

To use the components in your app, import them from the `ui` package.

import { Button } from "@workspace/ui/components/button";
```

## Setup Guide

Follow these steps to get the project running locally:

### 1. Install Dependencies
Run the following command at the root of the project to install all dependencies:
```bash
pnpm install
```

### 2. Environment Variables
Create a `.env` file from the provided `.env.example`.
```bash
cp .env.example .env
```
Fill in the required environment variables:
- `DATABASE_URL`: Your PostgreSQL database connection string.
- `UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN`: Upstash Redis credentials.
- `RESEND_API_KEY`: Resend API key for emails.
- `CLOUDINARY_*`: Cloudinary credentials for media storage.

### 3. Database Setup (Prisma)
Generate the Prisma client to ensure types are up to date:
```bash
# From the root directory (using turbo/pnpm)
pnpm --filter @workspace/db run db:generate

# Or from inside the packages/db directory
cd packages/db && pnpm run db:generate
```
Push the schema to your database:
```bash
pnpm --filter @workspace/db run db:migrate
```

### 4. Run the Application
Start the development server across the monorepo:
```bash
pnpm dev
```
