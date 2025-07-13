export interface Subject {
  id: string;
  name: string;
  code: string;
}

export interface QuizMode {
  id: string;
  name: string;
  description: string;
}

export interface Question {
  id: string;
  subject_id: string;
  question_text: string;
  options: string[];
  correct_answer: number;
  explanation?: string;
  source: 'past_exam' | 'ai_generated' | 'pattern_based';
  source_details?: string;
  created_at: string;
}

export interface Quiz {
  id: string;
  user_id: string;
  subject_id: string;
  mode: string;
  questions: Question[];
  answers: number[];
  score?: number;
  completed_at?: string;
  created_at: string;
}

export interface QuizResult {
  quiz_id: string;
  user_id: string;
  subject_name: string;
  mode_name: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  completed_at: string;
}

// Turkish subject definitions
export const SUBJECTS: Subject[] = [
  { id: 'farmakoloji', name: 'Farmakoloji', code: 'FAR' },
  { id: 'mikrobiyoloji', name: 'Mikrobiyoloji', code: 'MİK' },
  { id: 'patoloji', name: 'Patoloji', code: 'PAT' },
  { id: 'anatomi', name: 'Anatomi', code: 'ANA' },
  { id: 'fizyoloji', name: 'Fizyoloji', code: 'FİZ' },
  { id: 'biyokimya', name: 'Biyokimya', code: 'BİY' },
  { id: 'histoloji', name: 'Histoloji', code: 'HİS' },
  { id: 'embriyoloji', name: 'Embriyoloji', code: 'EMB' },
  { id: 'genel-cerrahi', name: 'Genel Cerrahi', code: 'CER' },
  { id: 'iç-hastalıkları', name: 'İç Hastalıkları', code: 'İÇH' },
];

// Turkish quiz modes
export const QUIZ_MODES: QuizMode[] = [
  {
    id: 'past_exam',
    name: 'Çıkmış Sorular',
    description: 'Geçmiş TUS sınavlarından gerçek sorular'
  },
  {
    id: 'mixed',
    name: 'Karışık',
    description: 'Çıkmış sorular ve yapay zeka ile oluşturulan sorular'
  }
]; 