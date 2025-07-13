'use client';

import Link from 'next/link';
import { useUser } from '@acme/auth-core';
import { Button } from '@acme/ui';

export default function Navbar() {
  const { user, signOut } = useUser();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center">
            <Link href="/" className="text-lg sm:text-xl font-bold text-primary-600">
              TUS Quiz
            </Link>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/" className="text-gray-700 hover:text-primary-600 px-2 sm:px-3 py-2 rounded-md text-sm font-medium">
              Ana Sayfa
            </Link>
            
            {user ? (
              <>
                <Link href="/quiz" className="text-gray-700 hover:text-primary-600 px-2 sm:px-3 py-2 rounded-md text-sm font-medium">
                  Quiz
                </Link>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <span className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                    {user.email}
                  </span>
                  <Button 
                    onClick={handleSignOut}
                    variant="outline"
                    size="sm"
                    className="min-h-[32px] sm:min-h-[36px] text-xs sm:text-sm"
                  >
                    Çıkış Yap
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link href="/signin" className="text-gray-700 hover:text-primary-600 px-2 sm:px-3 py-2 rounded-md text-sm font-medium">
                  Giriş Yap
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="min-h-[32px] sm:min-h-[36px] text-xs sm:text-sm">
                    Kayıt Ol
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 