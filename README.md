# Réseau TSI - Registration Platform

A registration platform for TSI network members built with React, Vite, and Express.

## Features

- User registration (Company or Contributor)
- Email verification with 6-digit code
- Secure login system
- User dashboard
- Profile management

## Tech Stack

**Frontend:**
- React 18 + Vite
- React Router
- Tailwind CSS
- Lucide React (icons)

**Backend:**
- Express.js
- Prisma ORM
- bcryptjs (password hashing)

**Database:**
- MySQL

## Quick Start

### 1. Install Dependencies

```bash
# Frontend
npm install --legacy-peer-deps

# Backend
cd server
npm install --legacy-peer-deps
cd ..
```

### 2. Setup Database

**Option A: Using SQL file**
```bash
# In phpMyAdmin, import database.sql
# Or run in MySQL:
mysql -u root -p < database.sql
```

**Option B: Using Prisma**
```bash
# Make sure .env file exists with DATABASE_URL
npx prisma db push
```

### 3. Configure Environment

The `.env` file is already created with:
```
DATABASE_URL="mysql://root:@localhost:3306/tsi"
RESEND_API_KEY="your_key"
EMAIL_FROM="onboarding@resend.dev"
```

Update if your MySQL has a password.

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

**Open Browser:**
```
http://localhost:3000
```

## Project Structure

```
tsi-registration/
├── src/              # React frontend
│   ├── components/   # UI components
│   ├── pages/        # Page components
│   ├── lib/          # Utilities
│   └── App.tsx       # Routes
├── server/           # Express backend
│   └── server.js     # API endpoints
├── prisma/           # Database schema
└── public/           # Static files
```

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify` - Verify email
- `POST /api/auth/resend-code` - Resend verification code
- `PUT /api/user/update` - Update user profile

## Database Schema

See `prisma/schema.prisma` or `database.sql` for the complete schema.

## Troubleshooting

### NPM Install Errors
Use `--legacy-peer-deps` flag:
```bash
npm install --legacy-peer-deps
```

### Database Connection Error
- Make sure MySQL is running (XAMPP)
- Check database `tsi` exists
- Verify `.env` file has correct DATABASE_URL

### Port Already in Use
- Frontend (3000): Vite will suggest alternative port
- Backend (3001): Change in `server/server.js`

## Development

- Frontend runs on: http://localhost:3000
- Backend runs on: http://localhost:3001
- phpMyAdmin: http://localhost/phpmyadmin

## Notes

- Verification codes currently show in backend terminal (email sending not implemented yet)
- Codes expire after 15 minutes
- Both frontend and backend must be running

## License

Educational project for TSI network.
