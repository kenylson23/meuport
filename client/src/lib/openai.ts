export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'fácil' | 'médio' | 'difícil';
  topic: string;
}

export interface QuizGenerationOptions {
  count: number;
  difficulty?: 'fácil' | 'médio' | 'difícil' | 'misto';
  topics?: string[];
  language?: 'português' | 'english';
}

export async function generateQuizQuestions(options: QuizGenerationOptions): Promise<QuizQuestion[]> {
  try {
    const response = await fetch('/api/quiz/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Falha na comunicação com o servidor');
    }

    const data = await response.json();
    return data.questions;
  } catch (error) {
    console.error('Erro ao gerar perguntas:', error);
    throw new Error(error instanceof Error ? error.message : 'Falha ao gerar perguntas do quiz. Verifique sua conexão e tente novamente.');
  }
}

export async function generateCustomQuestion(topic: string, difficulty: string): Promise<QuizQuestion> {
  const questions = await generateQuizQuestions({
    count: 1,
    difficulty: difficulty as 'fácil' | 'médio' | 'difícil',
    topics: [topic]
  });
  
  return questions[0];
}