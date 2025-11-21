# Réseau TSI

Registration platform for TSI network members.

## What it does

- Register as company or contributor
- Email verification
- User dashboard
- Profile management

## Setup

1. Install stuff:
```bash
pnpm install
```

2. Make a `.env.local` file:
```
DATABASE_URL="mysql://root:@localhost:3306/tsi"
RESEND_API_KEY="your_key"
EMAIL_FROM="onboarding@resend.dev"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

3. Setup database:
```bash
pnpm prisma db push
```

4. Run it:
```bash
pnpm dev
```

## Stack

- React 19
- Next.js 16
- Tailwind CSS
- MySQL + Prisma
- Resend for emails

## Database

Using XAMPP for local MySQL. Create a database called `tsi` in phpMyAdmin.

## Email

Get a free API key from resend.com and put it in your .env.local file.

## Notes

The verification emails expire after 15 minutes. Users need to verify their email before they can login.
