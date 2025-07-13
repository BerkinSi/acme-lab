import { Button } from '@acme/ui';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-primary-900 mb-6">
            TUS Quiz Platform
          </h1>
          <p className="text-xl text-primary-700 mb-8 max-w-2xl mx-auto">
            Prepare for the Turkish Medical Specialization Exam (TUS) with our comprehensive 
            quiz platform. Test your knowledge, track your progress, and improve your scores.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quiz">
              <Button size="lg" className="text-lg px-8 py-4">
                Start Quiz
              </Button>
            </Link>
            <Link href="/signin">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Sign In
              </Button>
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-primary-800 mb-3">
                Comprehensive Questions
              </h3>
              <p className="text-primary-600">
                Access thousands of carefully curated questions covering all TUS subjects.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-primary-800 mb-3">
                Progress Tracking
              </h3>
              <p className="text-primary-600">
                Monitor your performance and identify areas for improvement.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-primary-800 mb-3">
                Detailed Explanations
              </h3>
              <p className="text-primary-600">
                Learn from detailed explanations for every question and answer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 