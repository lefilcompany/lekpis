'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/inicio', label: 'Início', icon: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )},
  { href: '/conexoes', label: 'Conexões', icon: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  )},
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0F1523] text-white h-screen sticky top-0 flex flex-col justify-between">
      <div>
        <div className="p-4 font-bold text-lg flex items-center space-x-2">
          <div className="h-8 w-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <span>Lekpis</span>
        </div>

        <nav className="px-2">
          {navItems.map(item => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className={`flex items-center space-x-3 px-3 py-2 rounded-lg mb-1 transition-colors ${isActive ? 'bg-[#1A2337] text-white' : 'text-gray-300 hover:bg-[#141B2A] hover:text-white'}`}>
                <span className="text-gray-300">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-3">
        <div className="bg-[#141B2A] rounded-lg p-3 border border-[#1F2A44]">
          <div className="flex items-center space-x-2 text-gray-300 text-sm mb-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h2M7 10h14M5 6h14M7 14h10M5 18h6" />
            </svg>
            <span>Meu Plano</span>
          </div>
          <div className="text-xs text-gray-400 mb-3">Plano atual: <span className="text-purple-400">Gratuito</span></div>
          <button className="w-full bg-[#6D4AFF] hover:bg-[#5b3bf8] text-white text-sm py-2 rounded-md transition-colors">Ver detalhes do plano</button>
        </div>
      </div>
    </aside>
  );
}
