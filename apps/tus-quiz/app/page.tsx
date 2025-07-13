import { Button } from '@acme/ui';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-900 mb-4 sm:mb-6">
            TUS Quiz Platformu
          </h1>
          <p className="text-lg sm:text-xl text-primary-700 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Tıpta Uzmanlık Sınavı (TUS) için kapsamlı hazırlık platformu. 
            Bilginizi test edin, ilerlemenizi takip edin ve puanınızı yükseltin.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link href="/quiz" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 min-h-[44px]">
                Quiz Başlat
              </Button>
            </Link>
            <Link href="/signin" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 min-h-[44px]">
                Giriş Yap
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 px-4">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-semibold text-primary-800 mb-2 sm:mb-3">
                Kapsamlı Sorular
              </h3>
              <p className="text-sm sm:text-base text-primary-600">
                Tüm TUS konularını kapsayan binlerce özenle seçilmiş soruya erişin.
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-semibold text-primary-800 mb-2 sm:mb-3">
                İlerleme Takibi
              </h3>
              <p className="text-sm sm:text-base text-primary-600">
                Performansınızı izleyin ve geliştirilmesi gereken alanları belirleyin.
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-semibold text-primary-800 mb-2 sm:mb-3">
                Detaylı Açıklamalar
              </h3>
              <p className="text-sm sm:text-base text-primary-600">
                Her soru ve cevap için detaylı açıklamalardan öğrenin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 