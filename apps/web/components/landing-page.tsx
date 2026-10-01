'use client';

import { FormEvent, useState } from 'react';

const platforms = ['Instagram', 'LinkedIn', 'Facebook', 'X / Twitter'];

export function LandingPage() {
  const [websiteUrl, setWebsiteUrl] = useState('https://ihre-website.de');
  const [brandName, setBrandName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/campaigns/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          websiteUrl,
          brandName,
          companyName,
          email,
          platforms
        })
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({
        error: 'Beim Generieren der Kampagne ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 font-bold text-white">CC</div>
            <div>
              <p className="text-xl font-semibold">Content Cockpit</p>
            </div>
          </div>
          <div className="flex gap-4 text-sm text-slate-300">
            <span>DE</span>
            <span className="text-slate-500">|</span>
            <span>EN</span>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-sm text-brand-200">
              Deine digitale Kampagne in Sekunden erstellt
            </p>
            <h1 className="max-w-xl text-5xl font-black leading-tight tracking-tight text-white">
              Social Media Inhalte aus deiner Website automatisch generieren.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-slate-300">
              Unser Content Cockpit erstellt dir kostenlos und nur aus deiner URL eine ready-to-use Social-Media-Kampagne für eine Woche.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                'Website analysieren',
                'Inhalte generieren',
                'Kampagne starten'
              ].map((step) => (
                <div key={step} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/20 text-sm font-semibold text-brand-200">
                    {step.charAt(0)}
                  </div>
                  <p className="text-sm text-slate-200">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-800 bg-slate-900 p-6 shadow-soft">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm text-slate-300">Name *</label>
                <input
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-brand-500"
                  placeholder="Ihr Name"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">Unternehmen *</label>
                <input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-brand-500"
                  placeholder="Name Ihres Unternehmens"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">E-Mail *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-brand-500"
                  placeholder="ihre@email.de"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">Websites *</label>
                <input
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-brand-500"
                  placeholder="https://ihre-website.de"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-brand-500 px-5 py-3 font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? 'Kampagne wird erstellt...' : 'Jetzt Social Media Kampagne erstellen'}
              </button>
            </form>

            {result && (
              <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950 p-4 text-sm text-slate-200">
                {result.error ? (
                  <p className="text-red-400">{result.error}</p>
                ) : (
                  <div className="space-y-3">
                    <p className="font-semibold text-brand-300">Kampagne erfolgreich generiert</p>
                    <p>Website: {result.websiteUrl}</p>
                    <p>Status: {result.status}</p>
                    <div className="space-y-2 pt-2">
                      {result.posts?.map((post: any) => (
                        <div key={post.id} className="rounded-lg border border-slate-800 bg-slate-900 p-3">
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{post.platform}</p>
                          <p className="mt-2 text-slate-200">{post.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
