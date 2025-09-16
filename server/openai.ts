import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

function validateQuestion(q: any): boolean {
  return (
    typeof q.question === 'string' &&
    Array.isArray(q.options) &&
    q.options.length === 4 &&
    typeof q.correctAnswer === 'number' &&
    q.correctAnswer >= 0 &&
    q.correctAnswer <= 3 &&
    typeof q.explanation === 'string' &&
    typeof q.difficulty === 'string' &&
    typeof q.topic === 'string'
  );
}

export async function generateQuizQuestions(options: QuizGenerationOptions): Promise<QuizQuestion[]> {
  const { count, difficulty = 'misto', topics = [], language = 'português' } = options;
  
  const topicsText = topics.length > 0 
    ? `Focar nos seguintes tópicos: ${topics.join(', ')}.`
    : `Incluir tópicos variados como: JavaScript, TypeScript, React, Python, SQL, algoritmos, estruturas de dados, programação orientada a objetos, desenvolvimento web, APIs REST, Git, etc.`;

  const difficultyText = difficulty === 'misto' 
    ? 'Variar a dificuldade entre fácil, médio e difícil'
    : `Todas as perguntas devem ser de nível ${difficulty}`;

  const prompt = `
Gere ${count} perguntas de quiz sobre programação em português brasileiro.

Requisitos:
- ${topicsText}
- ${difficultyText}
- Cada pergunta deve ter exatamente 4 opções de resposta
- Sempre incluir uma explicação clara da resposta correta
- Perguntas devem ser práticas e relevantes para programadores
- Variar o estilo das perguntas (conceituais, código, boas práticas, etc.)

Responda APENAS com um JSON válido no seguinte formato:
{
  "questions": [
    {
      "question": "Pergunta aqui?",
      "options": ["Opção A", "Opção B", "Opção C", "Opção D"],
      "correctAnswer": 0,
      "explanation": "Explicação detalhada da resposta correta",
      "difficulty": "fácil",
      "topic": "JavaScript"
    }
  ]
}

Certifique-se de que o JSON seja válido e que correctAnswer seja o índice da resposta correta (0-3).
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "Você é um especialista em programação que cria questões de quiz educativas e desafiadoras. Sempre responda com JSON válido."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
    }, {
      timeout: 30000, // 30 second timeout
    });

    const result = JSON.parse(response.choices[0].message.content || '{"questions": []}');
    
    if (!result.questions || !Array.isArray(result.questions)) {
      throw new Error('Invalid response format from OpenAI');
    }

    // Validate and filter questions
    const validQuestions = result.questions
      .filter(validateQuestion)
      .map((q: any, index: number) => ({
        id: Date.now() + index,
        question: q.question,
        options: q.options,
        correctAnswer: Math.max(0, Math.min(3, q.correctAnswer)), // Clamp to 0-3
        explanation: q.explanation,
        difficulty: q.difficulty as 'fácil' | 'médio' | 'difícil',
        topic: q.topic
      }));

    if (validQuestions.length === 0) {
      throw new Error('No valid questions generated');
    }

    return validQuestions;
  } catch (error) {
    console.error('Error generating quiz questions:', error);
    throw new Error('Falha ao gerar perguntas do quiz. Verifique sua conexão e tente novamente.');
  }
}