'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@acme/auth-core';
import { Button } from '@acme/ui';

export default function QuizPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
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
            TUS Quiz - Protected Page
          </h1>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800">
              ✅ You are successfully authenticated as: <strong>{user.email}</strong>
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Quiz Features Coming Soon:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Multiple choice questions</li>
              <li>Progress tracking</li>
              <li>Performance analytics</li>
              <li>Study materials</li>
            </ul>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Button 
              onClick={() => router.push('/')}
              variant="outline"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 