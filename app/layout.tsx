import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Miniature — Cozy Isometric Park Builder',
  description: 'Build and manage a tiny, delightful theme park.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
