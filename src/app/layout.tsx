// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

export const metadata: Metadata = {
  title: 'TS Orbix PoC',
  description: 'Proof of Concept for TS Orbix',
};



import RootLayoutClient from '@/components/RootLayoutClient';
import DemoTour from '@/components/DemoTour';
import { Toaster } from 'sonner';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-screen antialiased text-slate-800" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
        <RootLayoutClient>{children}</RootLayoutClient>
        <DemoTour />
        <Toaster theme="dark" richColors />
      </body>
    </html>
  );
}
