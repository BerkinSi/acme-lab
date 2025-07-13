import { supabase } from '@acme/supabase-client';
import { Quiz, Question, QuizResult, SUBJECTS, QUIZ_MODES } from './types';

export class QuizService {
  static async createQuiz(userId: string, subjectId: string, mode: string): Promise<Quiz | null> {
    if (!supabase) return null;

    // For now, return a mock quiz. Later we'll fetch from Supabase
    const mockQuestions: Question[] = [
      {
        id: '1',
        subject_id: subjectId,
        question_text: 'Bu bir örnek sorudur. TUS sınavında hangi konu en çok soru gelir?',
        options: [
          'Farmakoloji',
          'Mikrobiyoloji', 
          'Patoloji',
          'Anatomi'
        ],
        correct_answer: 0,
        source: 'ai_generated',
        source_details: 'Yapay zeka ile oluşturuldu',
        created_at: new Date().toISOString()
      }
    ];

    const quiz: Quiz = {
      id: `quiz_${Date.now()}`,
      user_id: userId,
      subject_id: subjectId,
      mode,
      questions: mockQuestions,
      answers: [],
      created_at: new Date().toISOString()
    };

    return quiz;
  }

  static async saveQuizResult(quiz: Quiz): Promise<boolean> {
    if (!supabase) return false;

    try {
      const { error } = await supabase
        .from('quiz_results')
        .insert({
          quiz_id: quiz.id,
          user_id: quiz.user_id,
          subject_id: quiz.subject_id,
          mode: quiz.mode,
          score: quiz.score,
          completed_at: quiz.completed_at
        });

      return !error;
    } catch (error) {
      console.error('Error saving quiz result:', error);
      return false;
    }
  }

  static async getUserQuizHistory(userId: string): Promise<QuizResult[]> {
    if (!supabase) return [];

    try {
      const { data, error } = await supabase
        .from('quiz_results')
        .select(`
          *,
          subjects:subject_id(name)
        `)
        .eq('user_id', userId)
        .order('completed_at', { ascending: false });

      if (error) throw error;

      return data?.map(result => ({
        quiz_id: result.quiz_id,
        user_id: result.user_id,
        subject_name: result.subjects?.name || 'Bilinmeyen',
        mode_name: QUIZ_MODES.find(m => m.id === result.mode)?.name || 'Bilinmeyen',
        score: result.score,
        total_questions: result.total_questions,
        correct_answers: result.correct_answers,
        completed_at: result.completed_at
      })) || [];
    } catch (error) {
      console.error('Error fetching quiz history:', error);
      return [];
    }
  }

  static getSubjectById(id: string) {
    return SUBJECTS.find(subject => subject.id === id);
  }

  static getQuizModeById(id: string) {
    return QUIZ_MODES.find(mode => mode.id === id);
  }
} 