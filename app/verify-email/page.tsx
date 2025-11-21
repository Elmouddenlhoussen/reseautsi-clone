'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthLayout } from '@/components/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle } from 'lucide-react';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!email) {
      router.push('/login');
    }
  }, [email, router]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      setCode(pastedData.split(''));
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join('');
    
    if (verificationCode.length !== 6) {
      setError('Veuillez entrer le code complet');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: verificationCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setVerified(true);
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setError(data.error || 'Code de vérification incorrect');
      }
    } catch (error) {
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResending(true);
    setError('');

    try {
      const response = await fetch('/api/auth/resend-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Un nouveau code a été envoyé à votre email');
        setCode(['', '', '', '', '', '']);
      } else {
        setError(data.error || 'Erreur lors du renvoi du code');
      }
    } catch (error) {
      setError('Erreur de connexion au serveur');
    } finally {
      setResending(false);
    }
  };

  if (verified) {
    return (
      <AuthLayout>
        <div className="bg-card rounded-2xl shadow-lg p-8 max-w-md mx-auto text-center">
          <div className="mb-6">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Compte vérifié avec succès! ✅
          </h2>
          <p className="text-muted-foreground mb-4">
            Votre compte a été vérifié. Un email de bienvenue vous a été envoyé.
          </p>
          <p className="text-sm text-muted-foreground">
            Redirection vers la page de connexion...
          </p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="bg-card rounded-2xl shadow-lg p-8 max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">
            Vérifiez votre email
          </h2>
          <p className="text-muted-foreground">
            Nous avons envoyé un code de vérification à
          </p>
          <p className="font-semibold text-foreground mt-1">{email}</p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3 text-center">
              Entrez le code à 6 chiffres
            </label>
            <div className="flex gap-2 justify-center" onPaste={handlePaste}>
              {code.map((digit, index) => (
                <Input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-xl font-bold"
                  required
                />
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12"
            disabled={loading || code.some(d => !d)}
          >
            {loading ? 'Vérification en cours...' : 'Vérifier'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Vous n'avez pas reçu le code ?
          </p>
          <Button
            type="button"
            variant="ghost"
            onClick={handleResendCode}
            disabled={resending}
            className="text-primary hover:text-primary/90 font-semibold"
          >
            {resending ? 'Envoi en cours...' : 'Renvoyer le code'}
          </Button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Le code expire dans 15 minutes
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
