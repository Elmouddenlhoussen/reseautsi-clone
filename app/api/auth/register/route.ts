import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { sendVerificationEmail } from '@/lib/email';

function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, userType, ...otherFields } = body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Un utilisateur avec cet email existe déjà' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = generateVerificationCode();
    const verificationCodeExpiry = new Date(Date.now() + 15 * 60 * 1000);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        userType,
        isVerified: false,
        verificationCode,
        verificationCodeExpiry,
        ...otherFields,
      },
    });

    try {
      await sendVerificationEmail(email, name, verificationCode);
    } catch (emailError: any) {
      await prisma.user.delete({ where: { id: user.id } });
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de l\'email de vérification' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Inscription réussie! Vérifiez votre email.',
        user: { id: user.id, email: user.email, name: user.name }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'inscription' },
      { status: 500 }
    );
  }
}
