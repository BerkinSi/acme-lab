'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@acme/auth-core';
import { Button, Card, CardHeader, CardTitle, CardContent } from '@acme/ui';
import { SUBJECTS, QUIZ_MODES, QuizService } from '@acme/quiz-core';

export default function QuizPage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<string>('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [user, loading, router]);

  const handleStartQuiz = async () => {
    if (!user || !selectedSubject || !selectedMode) return;
    
    const quiz = await QuizService.createQuiz(user.id, selectedSubject, selectedMode);
    if (quiz) {
      // Navigate to the actual quiz taking page
      router.push(`/quiz/take/${quiz.id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-primary-900 mb-6">
            Quiz Oluştur
          </h1>
          
          <div className="space-y-6">
            {/* Subject Selection */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Konu Seçin
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {SUBJECTS.map((subject) => (
                  <Button
                    key={subject.id}
                    variant={selectedSubject === subject.id ? "default" : "outline"}
                    onClick={() => setSelectedSubject(subject.id)}
                    className="h-16 text-sm"
                  >
                    <div className="text-center">
                      <div className="font-semibold">{subject.name}</div>
                      <div className="text-xs text-gray-500">{subject.code}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Quiz Mode Selection */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Quiz Modu Seçin
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {QUIZ_MODES.map((mode) => (
                  <Card
                    key={mode.id}
                    className={`cursor-pointer transition-all ${
                      selectedMode === mode.id ? 'ring-2 ring-primary-500' : ''
                    }`}
                    onClick={() => setSelectedMode(mode.id)}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{mode.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{mode.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Start Quiz Button */}
            <div className="pt-6">
              <Button
                onClick={handleStartQuiz}
                disabled={!selectedSubject || !selectedMode}
                size="lg"
                className="w-full"
              >
                Quiz Başlat
              </Button>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Button 
              onClick={() => router.push('/')}
              variant="outline"
            >
              Ana Sayfaya Dön
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 