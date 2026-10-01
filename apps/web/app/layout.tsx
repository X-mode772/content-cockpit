import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Content Cockpit',
  description: 'KI-gestützte Social Media Kampagnen aus deiner Website in Sekunden'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
