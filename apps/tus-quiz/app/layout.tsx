import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@acme/auth-core';
import Navbar from './components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TusAI - Turkish Medical Exam Preparation',
  description: 'Prepare for the TUS exam with TusAI, the next-generation quiz platform.',
  icons: {
    icon: '/favicon.ico',
  },
  themeColor: '#5B21B6',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
} 