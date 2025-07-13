import { Button } from '@acme/ui';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-primary-900 mb-6">
            TUS Quiz Platformu
          </h1>
          <p className="text-xl text-primary-700 mb-8 max-w-2xl mx-auto">
            Tıpta Uzmanlık Sınavı (TUS) için kapsamlı hazırlık platformu. 
            Bilginizi test edin, ilerlemenizi takip edin ve puanınızı yükseltin.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quiz">
              <Button size="lg" className="text-lg px-8 py-4">
                Quiz Başlat
              </Button>
            </Link>
            <Link href="/signin">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Giriş Yap
              </Button>
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-primary-800 mb-3">
                Kapsamlı Sorular
              </h3>
              <p className="text-primary-600">
                Tüm TUS konularını kapsayan binlerce özenle seçilmiş soruya erişin.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-primary-800 mb-3">
                İlerleme Takibi
              </h3>
              <p className="text-primary-600">
                Performansınızı izleyin ve geliştirilmesi gereken alanları belirleyin.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-primary-800 mb-3">
                Detaylı Açıklamalar
              </h3>
              <p className="text-primary-600">
                Her soru ve cevap için detaylı açıklamalardan öğrenin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 