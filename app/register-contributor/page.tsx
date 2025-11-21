'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, ArrowLeft, Check } from 'lucide-react';

export default function RegisterContributorPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1 - Civil Status
    firstName: '',
    lastName: '',
    birthDate: '01 janvier 1990',
    birthPlace: '',
    birthCountry: '',
    nationality: '',
    siretNumber: '',
    // Step 2 - Information
    address: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    }
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
          userType: 'contributor',
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          birthDate: formData.birthDate,
          birthPlace: formData.birthPlace,
          birthCountry: formData.birthCountry,
          nationality: formData.nationality,
          siretNumber: formData.siretNumber,
          address: formData.address,
          hasDriverLicense: agreedToTerms,
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
      <div className="bg-card rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
        <Link
          href="/choice-register"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-6 font-medium"
        >
          <ArrowLeft size={20} />
          Retour
        </Link>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-1 text-foreground">
            Inscription Intervenant - Étape {step} / 4
          </h2>
          <p className="text-muted-foreground">
            Renseigner les informations ci-dessous :
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 flex gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors ${
                s <= step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <form onSubmit={step === 1 ? handleNext : handleSubmit} className="space-y-6">
          {step === 1 && (
            <>
              {/* Civil Status */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">État Civil</h3>
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
                    name="birthDate"
                    placeholder="01 janvier 1990"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="text"
                    name="birthPlace"
                    placeholder="Lieu de Naissance"
                    value={formData.birthPlace}
                    onChange={handleChange}
                    required
                  />
                  <select className="px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                    <option>France</option>
                    <option>Autres pays...</option>
                  </select>
                  <Input
                    type="text"
                    name="nationality"
                    placeholder="Nationalité"
                    value={formData.nationality}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="text"
                    name="siretNumber"
                    placeholder="N° Siret"
                    value={formData.siretNumber}
                    onChange={handleChange}
                    required
                    className="md:col-span-2"
                  />
                </div>
              </div>

              {/* Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    name="address"
                    placeholder="Adresse"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="md:col-span-2"
                  />
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="N° de téléphone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password */}
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

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-primary"
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground">
                  Titulaire du permis B en cours de validité
                </label>
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="grid md:grid-cols-2 gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="h-12 border-2"
              onClick={() => step === 1 ? router.back() : setStep(step - 1)}
            >
              Retour
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12"
              disabled={loading || (step === 1 && !agreedToTerms)}
            >
              {loading ? 'Traitement...' : step === 1 ? 'Continuer' : 'Terminer'}
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
