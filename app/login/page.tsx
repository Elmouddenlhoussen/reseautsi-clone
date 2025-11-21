'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Save user data to localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        alert('Connexion réussie!');
        router.push('/dashboard');
      } else if (data.needsVerification) {
        alert('Votre compte n\'est pas encore vérifié. Veuillez vérifier votre email.');
        router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
      } else {
        alert(data.error || 'Erreur lors de la connexion');
      }
    } catch (error) {
      alert('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left side - Illustration */}
        <div className="hidden md:flex flex-col items-center justify-center">
          <img
            src="/request-tsi.svg"
            alt="Réseau TSI"
            className="w-full max-w-2xl"
          />
        </div>

        {/* Right side - Login Form */}
        <div className="bg-card rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">
            Bienvenue sur le Réseau TSI! 
          </h2>
          <p className="text-muted-foreground mb-6">
            Veuillez vous connecter à votre compte et commencer l'aventure
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mot de passe</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <Link href="/forgot-password" className="text-sm text-primary hover:underline font-medium">
                Mot de passe oublié ?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 text-base"
              disabled={loading}
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Nouveau chez Réseau TSI ?{' '}
              <Link href="/choice-register" className="text-primary font-semibold hover:underline">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
