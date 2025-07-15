'use client';
import { Button, Card, CardHeader, CardTitle, CardContent } from '@acme/ui';
import Link from 'next/link';
import Image from 'next/image';

const GUMROAD_URL = 'https://tusaiapp.gumroad.com/l/ofwbw';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background py-10 px-4 flex flex-col items-center">
      <div className="flex flex-col items-center mb-8">
        <Image src="/logo.svg" alt="TusAI Logo" width={48} height={48} className="mb-2" />
        <h1 className="text-3xl font-bold text-primary mb-2">TusAI Fiyatlandırma</h1>
        <p className="text-muted text-base text-center max-w-xl">
          TUS hazırlık sürecinizi kolaylaştırmak için iki farklı plan sunuyoruz. İhtiyacınıza uygun olanı seçin ve hemen başlayın!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {/* Ücretsiz Plan */}
        <Card className="bg-background border-muted">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-primary mb-2">Ücretsiz</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="mb-6 space-y-2 text-base">
              <li>✔️ Günde <span className="font-semibold">1 quiz</span></li>
              <li>✔️ Sınırlı açıklamalar</li>
              <li>🔒 Eski quiz geçmişi kilitli</li>
              <li>🔒 PDF olarak dışa aktarma yok</li>
            </ul>
            <Link href="/signup">
              <Button className="w-full text-base font-medium">Ücretsiz Başla</Button>
            </Link>
          </CardContent>
        </Card>
        {/* Premium Plan */}
        <Card className="bg-background border-primary border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-primary mb-2">Premium</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="mb-6 space-y-2 text-base">
              <li>✔️ Günde <span className="font-semibold">5 quiz</span></li>
              <li>✔️ Tüm açıklamalar açık</li>
              <li>✔️ Quiz geçmişi tamamen açık</li>
              <li>✔️ PDF olarak dışa aktarma</li>
            </ul>
            <Button
              className="w-full text-base font-medium bg-primary text-background hover:bg-accent"
              onClick={() => window.open(GUMROAD_URL, '_blank')}
            >
              Premium’a Geç
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 