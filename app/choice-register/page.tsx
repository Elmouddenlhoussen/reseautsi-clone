'use client';

import Link from 'next/link';
import { AuthLayout } from '@/components/auth-layout';
import { Button } from '@/components/ui/button';
import { Building2, Users } from 'lucide-react';

export default function ChoiceRegisterPage() {
  return (
    <AuthLayout>
      <div className="bg-card rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 text-foreground">
            Choisissez votre profil
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Company Option */}
          <Link href="/register-company">
            <Button
              variant="outline"
              className="w-full h-32 flex flex-col items-center justify-center gap-3 border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all"
            >
              <Building2 size={32} className="text-primary" />
              <span className="text-lg font-semibold text-foreground">Structure</span>
            </Button>
          </Link>

          {/* Contributor Option */}
          <Link href="/register-contributor">
            <Button
              variant="outline"
              className="w-full h-32 flex flex-col items-center justify-center gap-3 border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all"
            >
              <Users size={32} className="text-primary" />
              <span className="text-lg font-semibold text-foreground">Intervenant</span>
            </Button>
          </Link>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground">
            Vous avez déjà un compte ?{' '}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
