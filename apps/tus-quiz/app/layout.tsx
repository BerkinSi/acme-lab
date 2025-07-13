import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@acme/auth-core';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TUS Quiz - Turkish Medical Exam Preparation',
  description: 'Prepare for the TUS exam with our comprehensive quiz platform',
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
          {children}
        </AuthProvider>
      </body>
    </html>
  );
} 