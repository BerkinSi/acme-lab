'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from '@acme/ui';
import { useUser } from '@acme/auth-core';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { signUp } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await signUp(email, password);
    
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push('/signin');
      }, 2000);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-3 sm:p-4">
      <Card className="w-full max-w-sm sm:max-w-md">
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="text-center text-2xl font-bold text-primary">Kayıt Ol</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          {success ? (
            <div className="text-center">
              <p className="text-green-600 mb-4 text-sm sm:text-base font-medium">
                Hesabınız başarıyla oluşturuldu! Lütfen e-posta adresinizi kontrol edin.
              </p>
              <p className="text-sm text-muted">
                Giriş sayfasına yönlendiriliyorsunuz...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1 sm:mb-2">
                  E-posta
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                  placeholder="E-posta adresinizi girin"
                  className="min-h-[44px] text-base"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1 sm:mb-2">
                  Şifre
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  required
                  placeholder="Şifrenizi girin"
                  minLength={6}
                  className="min-h-[44px] text-base"
                />
              </div>
              {error && (
                <div className="text-red-600 text-sm font-medium">{error}</div>
              )}
              <Button
                type="submit"
                className="w-full min-h-[44px] text-base font-medium"
                disabled={loading}
              >
                {loading ? 'Hesap oluşturuluyor...' : 'Kayıt Ol'}
              </Button>
            </form>
          )}
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-sm text-muted">
              Zaten hesabınız var mı?{' '}
              <Link href="/signin" className="text-primary hover:text-accent font-medium">
                Giriş yapın
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 