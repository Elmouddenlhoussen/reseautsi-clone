#!/bin/bash

echo "================================"
echo "TSI Registration - Installation"
echo "================================"
echo ""

echo "[1/4] Installing frontend dependencies..."
npm install --legacy-peer-deps
if [ $? -ne 0 ]; then
    echo "ERROR: Frontend installation failed!"
    exit 1
fi
echo "Frontend dependencies installed!"
echo ""

echo "[2/4] Installing backend dependencies..."
cd server
npm install --legacy-peer-deps
if [ $? -ne 0 ]; then
    echo "ERROR: Backend installation failed!"
    exit 1
fi
cd ..
echo "Backend dependencies installed!"
echo ""

echo "[3/4] Checking for .env.local file..."
if [ ! -f .env.local ]; then
    echo "WARNING: .env.local not found!"
    echo "Please create .env.local file from .env.example"
    echo ""
else
    echo ".env.local found!"
fi
echo ""

echo "[4/4] Setting up database..."
echo "Make sure MySQL is running and database 'tsi' exists!"
echo "Press Enter to run database setup, or Ctrl+C to skip..."
read
npx prisma db push
echo ""

echo "================================"
echo "Installation Complete!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Make sure MySQL is running"
echo "2. Open TWO terminals"
echo "3. Terminal 1: cd server && npm run dev"
echo "4. Terminal 2: npm run dev"
echo "5. Open http://localhost:3000"
echo ""
