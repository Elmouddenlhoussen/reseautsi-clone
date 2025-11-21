import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendVerificationEmail } from '@/lib/email';

// Generate 6-digit verification code
function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email requis' },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    // Check if already verified
    if (user.isVerified) {
      return NextResponse.json(
        { error: 'Ce compte est déjà vérifié' },
        { status: 400 }
      );
    }

    // Generate new verification code
    const verificationCode = generateVerificationCode();
    const verificationCodeExpiry = new Date(Date.now() + 15 * 60 * 1000);

    // Update user with new code
    await prisma.user.update({
      where: { email },
      data: {
        verificationCode,
        verificationCodeExpiry,
      },
    });

    // Send verification email
    try {
      await sendVerificationEmail(email, user.name, verificationCode);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de l\'email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Code de vérification renvoyé avec succès!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Resend code error:', error);
    return NextResponse.json(
      { error: 'Erreur lors du renvoi du code' },
      { status: 500 }
    );
  }
}
