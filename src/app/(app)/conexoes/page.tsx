'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

type Platform = {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  features: string[];
};

const PLATFORMS: Platform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Social media platform for photo and video sharing',
    color: '#C13584',
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A4.5 4.5 0 1 0 16.5 12 4.505 4.505 0 0 0 12 7.5zm0 2A2.5 2.5 0 1 1 9.5 12 2.503 2.503 0 0 1 12 9.5zM17.8 6.2a1 1 0 1 0 .2 2 1 1 0 0 0-.2-2z" />
      </svg>
    ),
    features: ['Alcance e impressões', 'Stories & Reels', 'Crescimento de seguidores']
  },
  {
    id: 'facebook',
    name: 'Facebook',
    description: 'Reach your audience with pages and posts analytics',
    color: '#1877F2',
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12" />
      </svg>
    ),
    features: ['Páginas', 'Alcance', 'Interações']
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    description: 'Track tweets performance and followers growth',
    color: '#000000',
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2H21l-6.554 7.49L22.5 22h-7.18l-4.6-6.01L5.3 22H2.5l7.05-8.05L1.5 2h7.28l4.16 5.59L18.244 2zm-2.51 18h1.39L8.35 4h-1.4l8.78 16z"/>
      </svg>
    ),
    features: ['Tweets', 'Impressões', 'Seguidores']
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    description: 'Measure short-video performance and profile growth',
    color: '#010101',
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 8.5a6.6 6.6 0 0 1-4.1-1.4V15a6 6 0 1 1-6-6c.3 0 .6 0 .9.1v3A3 3 0 1 0 12 18a3 3 0 0 0 3-3V2h3a6.6 6.6 0 0 0 3 4.7V8.5z"/>
      </svg>
    ),
    features: ['Visualizações', 'Interações', 'Seguidores']
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    description: 'Company pages analytics and engagement',
    color: '#0A66C2',
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.94 6.94A2.94 2.94 0 1 1 4 4a2.94 2.94 0 0 1 2.94 2.94zM4.5 20.5h4.9V9.9H4.5zM14.6 9.6A4.4 4.4 0 0 0 10.7 12v8.5h4.9v-7.3c0-1.8 2.3-2 2.3 0v7.3H23V13c0-5.3-5.6-5.1-8.4-3.4z"/>
      </svg>
    ),
    features: ['Páginas', 'Alcance', 'Leads']
  }
];

export default function ConnectionsPage() {
  const [connecting, setConnecting] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const provider = searchParams.get('provider');
  const message = searchParams.get('message');
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    if (!status) setShowBanner(false);
  }, [status]);

  const handleConnect = async (id: string) => {
    if (id === 'instagram') {
      setConnecting(id);
      window.location.href = '/api/meta/instagram/start';
      return;
    }

    setConnecting(id);
    await new Promise(r => setTimeout(r, 800));
    setConnecting(null);
    alert(`${id} conectado! (mock)`);
  };

  const metrics = [
    { label: 'Conectadas', value: '0', icon: (
      <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ) },
    { label: 'Disponíveis', value: String(PLATFORMS.length), icon: (
      <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ) },
    { label: 'Integração', value: '0%', icon: (
      <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.983 13.803A1.803 1.803 0 1113.786 12a1.803 1.803 0 01-1.803 1.803z" />
      </svg>
    ) }
  ];

  return (
    <div className="space-y-6">
      {/* Status banner */}
      {showBanner && status && (
        <div className={`rounded-lg p-3 text-sm ${status === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              {status === 'success' ? `Conexão com ${provider} realizada com sucesso.` : `Erro ao conectar ${provider}: ${message || ''}`}
            </div>
            <button onClick={() => setShowBanner(false)} className="text-inherit/80 hover:text-inherit">✕</button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Conexões</h1>
          <p className="text-sm text-gray-500">Conecte suas contas de redes sociais e ferramentas de marketing para centralizar todos os seus KPIs</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582M20 20v-5h-.581M4 9a7 7 0 0014 0M20 15a7 7 0 00-14 0" />
          </svg>
          Atualizar
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map(m => (
          <div key={m.label} className="bg-white border border-gray-200 rounded-xl p-5 flex items-start space-x-3">
            <div className="mt-1">{m.icon}</div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{m.value}</div>
              <div className="text-sm text-gray-500">{m.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Available Platforms */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Plataformas Disponíveis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PLATFORMS.map(p => (
            <div key={p.id} className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${p.color}1A`, color: p.color }}>
                  {p.icon}
                </div>
                <div>
                  <div className="text-base font-semibold text-gray-900">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.description}</div>
                </div>
              </div>

              <div className="mt-5">
                <div className="text-xs text-gray-500 mb-2">RECURSOS:</div>
                <div className="flex flex-wrap gap-2">
                  {p.features.slice(0, 2).map(f => (
                    <span key={f} className="inline-flex items-center text-xs bg-[#152238] text-white px-2 py-1 rounded-md">{f}</span>
                  ))}
                  {p.features.length > 2 && (
                    <span className="inline-flex items-center text-xs bg-white text-[#0F1523] border border-gray-300 px-2 py-1 rounded-md">+{p.features.length - 2} mais</span>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleConnect(p.id)}
                disabled={connecting === p.id}
                className="mt-5 w-full bg-[#6D4AFF] hover:bg-[#5b3bf8] disabled:opacity-60 text-white text-sm py-2 rounded-lg"
              >
                {connecting === p.id ? 'Conectando...' : 'Conectar'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
