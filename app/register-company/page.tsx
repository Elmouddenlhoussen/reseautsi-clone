'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function RegisterCompanyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    service: '',
    jobTitle: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: `${formData.firstName} ${formData.lastName}`,
          userType: 'company',
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          companyName: formData.companyName,
          service: formData.service,
          jobTitle: formData.jobTitle,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);
      } else {
        alert(data.error || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      alert('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="bg-card rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
        <Link
          href="/choice-register"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-6 font-medium"
        >
          <ArrowLeft size={20} />
          Retour
        </Link>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-1 text-foreground">
            Inscription structure
          </h2>
          <p className="text-muted-foreground">
            Renseigner les informations ci-dessous :
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Vos information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Vos information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                type="text"
                name="firstName"
                placeholder="Prénom"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="lastName"
                placeholder="Nom"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="companyName"
                placeholder="Saisir le nom de votre structure"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="service"
                placeholder="Saisir le nom de votre service"
                value={formData.service}
                onChange={handleChange}
              />
              <Input
                type="text"
                name="jobTitle"
                placeholder="Saisir votre fonction dans l'entreprise"
                value={formData.jobTitle}
                onChange={handleChange}
                required
                className="md:col-span-2"
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                type="tel"
                name="phone"
                placeholder="N° de téléphone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Sécurité</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Mot de passe</label>
                <p className="text-xs text-muted-foreground mb-2">
                  Minimum 8 caractères dont au moins une majuscule, une minuscule, un caractère spécial et un chiffre.
                </p>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Confirmation du mot de passe</label>
                <p className="text-xs text-muted-foreground mb-2">
                  Minimum 8 caractères dont au moins une majuscule, une minuscule, un caractère spécial et un chiffre.
                </p>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid md:grid-cols-2 gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="h-12 border-2"
              onClick={() => router.back()}
            >
              Retour
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12"
              disabled={loading}
            >
              {loading ? 'Inscription en cours...' : 'Continuer'}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
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
