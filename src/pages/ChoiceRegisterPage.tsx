import { Link } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { Button } from '../components/Button';
import { Building2, Users } from 'lucide-react';

export default function ChoiceRegisterPage() {
  return (
    <AuthLayout>
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Choisissez votre profil
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link to="/register-company">
            <Button
              variant="outline"
              className="w-full h-32 flex flex-col items-center justify-center gap-3"
            >
              <Building2 size={32} className="text-blue-600" />
              <span className="text-lg font-semibold">Structure</span>
            </Button>
          </Link>

          <Link to="/register-contributor">
            <Button
              variant="outline"
              className="w-full h-32 flex flex-col items-center justify-center gap-3"
            >
              <Users size={32} className="text-blue-600" />
              <span className="text-lg font-semibold">Intervenant</span>
            </Button>
          </Link>
        </div>

        <div className="text-center">
          <p className="text-slate-600">
            Vous avez déjà un compte ?{' '}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
