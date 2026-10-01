'use client';

import { useEffect, useState } from 'react';

interface Campaign {
  id: string;
  companyName: string;
  websiteUrl: string;
  status: string;
  createdAt: string;
  posts?: any[];
}

export default function DashboardPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const stored = localStorage.getItem('campaigns');
        if (stored) {
          setCampaigns(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading campaigns:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  const deleteCampaign = (id: string) => {
    const updated = campaigns.filter(c => c.id !== id);
    setCampaigns(updated);
    localStorage.setItem('campaigns', JSON.stringify(updated));
    setSelectedCampaign(null);
  };

  const downloadCampaign = (campaign: Campaign) => {
    const content = `
Campaign: ${campaign.companyName}
Website: ${campaign.websiteUrl}
Status: ${campaign.status}
Created: ${new Date(campaign.createdAt).toLocaleDateString('de-DE')}

--- POSTS ---
${campaign.posts?.map(post => `
[${post.platform}]
Headline: ${post.headline}
Content: ${post.content}
`).join('\n')}
    `;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `campaign-${campaign.id}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="mt-2 text-slate-400">Verwalte deine Kampagnen</p>
          </div>
          <a
            href="/"
            className="rounded-xl bg-brand-500 px-6 py-3 font-semibold text-white transition hover:bg-brand-600"
          >
            + Neue Kampagne
          </a>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          {/* Campaign List */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-4 text-lg font-semibold">Kampagnen ({campaigns.length})</h2>
            <div className="space-y-2">
              {campaigns.length === 0 ? (
                <p className="text-sm text-slate-400">Keine Kampagnen vorhanden. Erstelle eine neue!</p>
              ) : (
                campaigns.map(campaign => (
                  <button
                    key={campaign.id}
                    onClick={() => setSelectedCampaign(campaign)}
                    className={`w-full rounded-lg border p-3 text-left transition ${
                      selectedCampaign?.id === campaign.id
                        ? 'border-brand-500 bg-brand-500/10'
                        : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <p className="font-medium">{campaign.companyName}</p>
                    <p className="text-xs text-slate-400">{campaign.websiteUrl}</p>
                    <p className="mt-1 inline-flex rounded-full bg-slate-700 px-2 py-0.5 text-xs">
                      {campaign.status}
                    </p>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Campaign Details */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            {selectedCampaign ? (
              <div className="space-y-6">
                <div>
                  <h2 className="mb-4 text-2xl font-bold">{selectedCampaign.companyName}</h2>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>Website: {selectedCampaign.websiteUrl}</p>
                    <p>Status: {selectedCampaign.status}</p>
                    <p>Erstellt: {new Date(selectedCampaign.createdAt).toLocaleDateString('de-DE')}</p>
                  </div>
                </div>

                {/* Posts */}
                <div>
                  <h3 className="mb-3 font-semibold">Posts ({selectedCampaign.posts?.length || 0})</h3>
                  <div className="space-y-3">
                    {selectedCampaign.posts?.map((post, idx) => (
                      <div key={idx} className="rounded-lg border border-slate-700 bg-slate-800 p-3">
                        <p className="text-xs uppercase tracking-widest text-brand-300">{post.platform}</p>
                        <p className="mt-2 font-medium text-white">{post.headline}</p>
                        <p className="mt-2 line-clamp-3 text-sm text-slate-300">{post.content}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4">
                  <button
                    onClick={() => downloadCampaign(selectedCampaign)}
                    className="flex-1 rounded-lg bg-slate-800 px-4 py-2 font-medium text-white transition hover:bg-slate-700"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => deleteCampaign(selectedCampaign.id)}
                    className="flex-1 rounded-lg bg-red-900/20 px-4 py-2 font-medium text-red-300 transition hover:bg-red-900/40"
                  >
                    Löschen
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex h-96 items-center justify-center">
                <p className="text-slate-400">Wähle eine Kampagne aus, um Details zu sehen</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
