'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { User, Building2, LogOut, Edit2, Check, X, Mail, Phone, Calendar, MapPin } from 'lucide-react';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            router.push('/login');
            return;
        }
        setUser(JSON.parse(userData));
        setLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/login');
    };

    const toggleEdit = () => setEditing(!editing);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-lg text-slate-600">Chargement...</div>
            </div>
        );
    }

    if (!user) return null;

    const isCompany = user.userType === 'company';

    return (
        <div className="min-h-screen bg-slate-50">
            <nav className="bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">T</span>
                        </div>
                        <span className="text-xl font-semibold text-slate-800">Réseau TSI</span>
                    </div>
                    <Button onClick={handleLogout} variant="ghost" size="sm" className="gap-2">
                        <LogOut size={16} />
                        Déconnexion
                    </Button>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        Bonjour, {user.firstName || user.name} 👋
                    </h1>
                    <p className="text-slate-600">
                        {isCompany ? 'Compte Structure' : 'Compte Intervenant'}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-5 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Check className="text-green-600" size={20} />
                            </div>
                            <span className="text-sm font-medium text-slate-600">Statut</span>
                        </div>
                        <p className="text-lg font-semibold text-slate-900">Vérifié</p>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                {isCompany ? <Building2 className="text-blue-600" size={20} /> : <User className="text-blue-600" size={20} />}
                            </div>
                            <span className="text-sm font-medium text-slate-600">Type</span>
                        </div>
                        <p className="text-lg font-semibold text-slate-900">
                            {isCompany ? 'Structure' : 'Intervenant'}
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Calendar className="text-purple-600" size={20} />
                            </div>
                            <span className="text-sm font-medium text-slate-600">Membre depuis</span>
                        </div>
                        <p className="text-lg font-semibold text-slate-900">
                            {new Date(user.createdAt).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-slate-900">Informations personnelles</h2>
                        <Button onClick={toggleEdit} variant="outline" size="sm" className="gap-2">
                            {editing ? <X size={16} /> : <Edit2 size={16} />}
                            {editing ? 'Annuler' : 'Modifier'}
                        </Button>
                    </div>

                    {editing ? (
                        <EditForm user={user} setUser={setUser} setEditing={setEditing} />
                    ) : (
                        <ProfileView user={user} isCompany={isCompany} />
                    )}
                </div>
            </div>
        </div>
    );
}

function ProfileView({ user, isCompany }: { user: any; isCompany: boolean }) {
    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <Field icon={<User size={18} />} label="Prénom" value={user.firstName} />
                <Field icon={<User size={18} />} label="Nom" value={user.lastName} />
                <Field icon={<Mail size={18} />} label="Email" value={user.email} />
                <Field icon={<Phone size={18} />} label="Téléphone" value={user.phone} />
            </div>

            {isCompany && (
                <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
                    <Field icon={<Building2 size={18} />} label="Structure" value={user.companyName} />
                    <Field icon={<Building2 size={18} />} label="Service" value={user.service} />
                    <Field icon={<Building2 size={18} />} label="Fonction" value={user.jobTitle} className="md:col-span-2" />
                </div>
            )}

            {!isCompany && (
                <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
                    <Field icon={<Calendar size={18} />} label="Date de naissance" value={user.birthDate} />
                    <Field icon={<MapPin size={18} />} label="Lieu de naissance" value={user.birthPlace} />
                    <Field icon={<MapPin size={18} />} label="Pays de naissance" value={user.birthCountry} />
                    <Field icon={<MapPin size={18} />} label="Nationalité" value={user.nationality} />
                    <Field icon={<Building2 size={18} />} label="N° Siret" value={user.siretNumber} />
                    <Field icon={<MapPin size={18} />} label="Adresse" value={user.address} className="md:col-span-2" />
                    <Field icon={<Check size={18} />} label="Permis B" value={user.hasDriverLicense ? 'Oui' : 'Non'} />
                </div>
            )}
        </div>
    );
}

function Field({ icon, label, value, className = '' }: { icon: React.ReactNode; label: string; value?: string; className?: string }) {
    return (
        <div className={className}>
            <div className="flex items-center gap-2 mb-2">
                <span className="text-slate-400">{icon}</span>
                <span className="text-sm font-medium text-slate-600">{label}</span>
            </div>
            <p className="text-slate-900 pl-7">{value || '-'}</p>
        </div>
    );
}

function EditForm({ user, setUser, setEditing }: { user: any; setUser: any; setEditing: any }) {
    const [form, setForm] = useState(user);
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch('/api/user/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                setEditing(false);
                alert('Profil mis à jour');
            } else {
                alert(data.error || 'Erreur');
            }
        } catch {
            alert('Erreur de connexion');
        } finally {
            setSaving(false);
        }
    };

    const isCompany = user.userType === 'company';

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
                <Input label="Prénom" name="firstName" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
                <Input label="Nom" name="lastName" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
                <Input label="Téléphone" name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                <Input label="Email" value={form.email} disabled />

                {isCompany && (
                    <>
                        <Input label="Structure" name="companyName" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} required />
                        <Input label="Service" name="service" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} />
                        <Input label="Fonction" name="jobTitle" value={form.jobTitle} onChange={(e) => setForm({ ...form, jobTitle: e.target.value })} required className="md:col-span-2" />
                    </>
                )}

                {!isCompany && (
                    <>
                        <Input label="Date de naissance" name="birthDate" value={form.birthDate} onChange={(e) => setForm({ ...form, birthDate: e.target.value })} required />
                        <Input label="Lieu de naissance" name="birthPlace" value={form.birthPlace} onChange={(e) => setForm({ ...form, birthPlace: e.target.value })} required />
                        <Input label="Pays de naissance" name="birthCountry" value={form.birthCountry} onChange={(e) => setForm({ ...form, birthCountry: e.target.value })} required />
                        <Input label="Nationalité" name="nationality" value={form.nationality} onChange={(e) => setForm({ ...form, nationality: e.target.value })} required />
                        <Input label="N° Siret" name="siretNumber" value={form.siretNumber} onChange={(e) => setForm({ ...form, siretNumber: e.target.value })} required />
                        <Input label="Adresse" name="address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required className="md:col-span-2" />
                    </>
                )}
            </div>

            <div className="flex justify-end pt-4">
                <Button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700">
                    {saving ? 'Enregistrement...' : 'Enregistrer'}
                </Button>
            </div>
        </form>
    );
}

function Input({ label, name, value, onChange, required = false, disabled = false, className = '' }: any) {
    return (
        <div className={className}>
            <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
            <input
                type="text"
                name={name}
                value={value || ''}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-100"
            />
        </div>
    );
}
