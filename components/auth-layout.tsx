import { ReactNode } from 'react';
import { LogoHeader } from './logo-header';

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4 relative">
      <LogoHeader />
      <div className="w-full max-w-4xl">
        {children}
      </div>
    </div>
  );
}
