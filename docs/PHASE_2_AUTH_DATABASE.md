'use client';

import { FormEvent, useState } from 'react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registrierung fehlgeschlagen');

      if (typeof window !== 'undefined') {
        localStorage.setItem('auth-token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      setMessage('Registrierung erfolgreich.');
      window.location.href = '/dashboard';
    } catch (error: any) {
      setMessage(error.message || 'Registrierung fehlgeschlagen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <h1 className="mb-6 text-3xl font-bold">Registrieren</h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-brand-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Unternehmen</label>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">E-Mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-brand-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Passwort</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-brand-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-brand-500 px-5 py-3 font-semibold text-white hover:bg-brand-600 disabled:opacity-60"
          >
            {loading ? 'Bitte warten...' : 'Konto erstellen'}
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-slate-300">{message}</p>}
      </div>
    </main>
  );
}
