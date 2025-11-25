import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
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
        localStorage.setItem('user', JSON.stringify(data.user));
        alert('Connexion réussie!');
        navigate('/dashboard');
      } else if (data.needsVerification) {
        alert('Votre compte n\'est pas encore vérifié. Veuillez vérifier votre email.');
        navigate(`/verify-email?email=${encodeURIComponent(data.email)}`);
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
        <div className="hidden md:flex flex-col items-center justify-center">
          <img
            src="/request-tsi.svg"
            alt="Réseau TSI"
            className="w-full max-w-2xl"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-2">
            Bienvenue sur le Réseau TSI! 
          </h2>
          <p className="text-slate-600 mb-6">
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline font-medium">
                Mot de passe oublié ?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Nouveau chez Réseau TSI ?{' '}
              <Link to="/choice-register" className="text-blue-600 font-semibold hover:underline">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
