import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Surya Snack - Camilan Khas UMKM',
  description: 'Website resmi katalog dan pemesanan Surya Snack',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className="bg-gray-50 min-h-screen flex flex-col justify-between font-sans"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}