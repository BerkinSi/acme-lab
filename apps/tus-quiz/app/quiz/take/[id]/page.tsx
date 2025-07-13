'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useUser } from '@acme/auth-core';
import { Button, Card, CardHeader, CardTitle, CardContent, Progress } from '@acme/ui';
import { Quiz, Question, QuizService } from '@acme/quiz-core';

export default function QuizTakePage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const params = useParams();
  const quizId = params.id as string;
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizLoading, setQuizLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
      return;
    }

    if (user && quizId) {
      // For now, create a mock quiz. Later we'll fetch from Supabase
      const mockQuiz: Quiz = {
        id: quizId,
        user_id: user.id,
        subject_id: 'farmakoloji',
        mode: 'mixed',
        questions: [
          {
            id: '1',
            subject_id: 'farmakoloji',
            question_text: 'Aşağıdakilerden hangisi beta-bloker sınıfında yer alır?',
            options: [
              'Propranolol',
              'Amlodipin',
              'Lisinopril',
              'Losartan'
            ],
            correct_answer: 0,
            source: 'ai_generated',
            source_details: 'Yapay zeka ile oluşturuldu',
            created_at: new Date().toISOString()
          },
          {
            id: '2',
            subject_id: 'farmakoloji',
            question_text: 'Hangi ilaç ACE inhibitörü sınıfında yer alır?',
            options: [
              'Metoprolol',
              'Enalapril',
              'Diltiazem',
              'Furosemid'
            ],
            correct_answer: 1,
            source: 'past_exam',
            source_details: 'Çıkmış soru - Mart 2022',
            created_at: new Date().toISOString()
          }
        ],
        answers: [],
        created_at: new Date().toISOString()
      };
      
      setQuiz(mockQuiz);
      setAnswers(new Array(mockQuiz.questions.length).fill(-1));
      setQuizLoading(false);
    }
  }, [user, loading, quizId, router]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz!.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(answers[currentQuestionIndex + 1] !== -1 ? answers[currentQuestionIndex + 1] : null);
    } else {
      // Quiz completed
      const score = answers.filter((answer, index) => 
        answer === quiz!.questions[index].correct_answer
      ).length;
      
      const completedQuiz = {
        ...quiz!,
        answers,
        score,
        completed_at: new Date().toISOString()
      };
      
      setQuiz(completedQuiz);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(answers[currentQuestionIndex - 1] !== -1 ? answers[currentQuestionIndex - 1] : null);
    }
  };

  const handleFinishQuiz = async () => {
    if (!quiz) return;
    
    // Save quiz result
    await QuizService.saveQuizResult(quiz);
    
    // Navigate to results page or back to quiz selection
    router.push('/quiz');
  };

  if (loading || quizLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!user || !quiz) {
    return null;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  if (showResults) {
    const correctAnswers = answers.filter((answer, index) => 
      answer === quiz.questions[index].correct_answer
    ).length;
    
    const score = (correctAnswers / quiz.questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 p-3 sm:p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 sm:p-8">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl sm:text-3xl">Quiz Tamamlandı!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl sm:text-6xl font-bold text-primary-600 mb-2">
                  {score.toFixed(0)}%
                </div>
                <p className="text-lg text-gray-600">
                  {correctAnswers} / {quiz.questions.length} doğru
                </p>
              </div>
              
              <div className="space-y-4">
                {quiz.questions.map((question, index) => (
                  <div key={question.id} className="border rounded-lg p-4">
                    <p className="font-medium mb-2">
                      Soru {index + 1}: {question.question_text}
                    </p>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-2 rounded ${
                            answers[index] === optionIndex
                              ? optionIndex === question.correct_answer
                                ? 'bg-green-100 border-green-300'
                                : 'bg-red-100 border-red-300'
                              : optionIndex === question.correct_answer
                              ? 'bg-green-100 border-green-300'
                              : 'bg-gray-50'
                          } border`}
                        >
                          {option}
                          {optionIndex === question.correct_answer && (
                            <span className="ml-2 text-green-600 font-medium">✓ Doğru</span>
                          )}
                          {answers[index] === optionIndex && optionIndex !== question.correct_answer && (
                            <span className="ml-2 text-red-600 font-medium">✗ Yanlış</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleFinishQuiz} className="flex-1">
                  Quiz Seçimine Dön
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 p-3 sm:p-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Soru {currentQuestionIndex + 1} / {quiz.questions.length}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">
              {currentQuestion.question_text}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  onClick={() => handleAnswerSelect(index)}
                  className="w-full justify-start h-auto p-4 text-left min-h-[44px]"
                >
                  <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            variant="outline"
            className="min-h-[44px]"
          >
            Önceki
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="min-h-[44px]"
          >
            {currentQuestionIndex === quiz.questions.length - 1 ? 'Bitir' : 'Sonraki'}
          </Button>
        </div>
      </div>
    </div>
  );
} 