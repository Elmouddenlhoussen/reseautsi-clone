export function LogoHeader() {
  return (
    <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
      <img 
        src="/logo.png" 
        alt="Réseau TSI Logo" 
        className="w-16 h-16 object-contain"
      />
      <h1 className="text-2xl font-bold text-primary">Réseau TSI</h1>
    </div>
  );
}
