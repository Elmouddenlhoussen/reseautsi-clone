import { ReactNode } from 'react';
import { LogoHeader } from './LogoHeader';

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4 relative">
      <LogoHeader />
      <div className="w-full max-w-4xl">
        {children}
      </div>
    </div>
  );
}
