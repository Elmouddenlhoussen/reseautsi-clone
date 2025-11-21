'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulated password reset request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <AuthLayout>
      <div className="bg-card rounded-2xl shadow-lg p-8 max-w-md mx-auto">
        {!submitted ? (
          <>
            <h2 className="text-2xl font-semibold mb-2 text-foreground">
              Mot de passe oublié? 🔒
            </h2>
            <p className="text-muted-foreground mb-6">
              Veuillez saisir votre adresse email nous vous enverrons un lien de réinitialisation.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <p className="text-sm text-muted-foreground">
                Si vous n'avez pas d'adresse email, veuillez contacter votre administrateur.
              </p>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 text-base"
                disabled={loading}
              >
                {loading ? 'Envoi en cours...' : 'Envoyer le lien'}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">✉️</div>
            <h2 className="text-2xl font-semibold mb-2 text-foreground">
              Email envoyé!
            </h2>
            <p className="text-muted-foreground mb-6">
              Nous avons envoyé un lien de réinitialisation à <strong>{email}</strong>. 
              Veuillez vérifier votre boîte de réception.
            </p>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link 
            href="/login" 
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            <ArrowLeft size={16} />
            Retour à la page de connexion
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
