import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlowCard from "../ui/GlowCard";
import { useAudio } from "../../lib/stores/useAudio";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'fácil' | 'médio' | 'difícil';
  topic: string;
}

interface QuizProps {
  onComplete?: (score: number, total: number) => void;
}

const programmingQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Qual é a diferença principal entre `let` e `var` em JavaScript?",
    options: [
      "Não há diferença",
      "`let` tem escopo de bloco, `var` tem escopo de função",
      "`var` é mais rápido que `let`",
      "`let` só funciona em browsers modernos"
    ],
    correctAnswer: 1,
    explanation: "`let` tem escopo de bloco e não pode ser redeclarado, enquanto `var` tem escopo de função e pode ser redeclarado.",
    difficulty: 'fácil',
    topic: 'JavaScript'
  },
  {
    id: 2,
    question: "O que é TypeScript?",
    options: [
      "Uma linguagem de programação completamente diferente",
      "Um superset do JavaScript que adiciona tipagem estática",
      "Um framework para React",
      "Uma biblioteca de animações"
    ],
    correctAnswer: 1,
    explanation: "TypeScript é um superset do JavaScript desenvolvido pela Microsoft que adiciona tipagem estática opcional.",
    difficulty: 'fácil',
    topic: 'TypeScript'
  },
  {
    id: 3,
    question: "Em React, o que são Hooks?",
    options: [
      "Funções que permitem usar estado e outros recursos em componentes funcionais",
      "Componentes de classe especiais",
      "Bibliotecas externas",
      "Métodos para conectar APIs"
    ],
    correctAnswer: 0,
    explanation: "Hooks são funções que permitem usar estado e outros recursos do React em componentes funcionais.",
    difficulty: 'médio',
    topic: 'React'
  },
  {
    id: 4,
    question: "Qual comando SQL é usado para recuperar dados de uma tabela?",
    options: [
      "INSERT",
      "UPDATE",
      "SELECT",
      "DELETE"
    ],
    correctAnswer: 2,
    explanation: "SELECT é o comando SQL usado para recuperar/consultar dados de uma ou mais tabelas.",
    difficulty: 'fácil',
    topic: 'SQL'
  },
  {
    id: 5,
    question: "O que é o Virtual DOM no React?",
    options: [
      "Uma cópia do DOM real mantida na memória",
      "Um servidor virtual",
      "Uma biblioteca de testes",
      "Um tipo de componente"
    ],
    correctAnswer: 0,
    explanation: "Virtual DOM é uma representação virtual do DOM real mantida na memória, que permite otimizações de performance.",
    difficulty: 'médio',
    topic: 'React'
  },
  {
    id: 6,
    question: "Em Python, qual é a diferença entre uma lista e uma tupla?",
    options: [
      "Não há diferença",
      "Listas são mutáveis, tuplas são imutáveis",
      "Tuplas são mais rápidas para todos os casos",
      "Listas só podem conter números"
    ],
    correctAnswer: 1,
    explanation: "Listas são mutáveis (podem ser modificadas), enquanto tuplas são imutáveis (não podem ser alteradas após criação).",
    difficulty: 'médio',
    topic: 'Python'
  },
  {
    id: 7,
    question: "O que significa 'closure' em JavaScript?",
    options: [
      "Fechamento de um arquivo",
      "Uma função que tem acesso ao escopo externo mesmo após a função externa ter retornado",
      "Um tipo de loop",
      "Um método de array"
    ],
    correctAnswer: 1,
    explanation: "Closure é quando uma função interna tem acesso às variáveis da função externa, mesmo após a função externa ter terminado.",
    difficulty: 'difícil',
    topic: 'JavaScript'
  },
  {
    id: 8,
    question: "O que é REST API?",
    options: [
      "Um tipo de banco de dados",
      "Um padrão arquitetural para APIs web usando HTTP",
      "Uma linguagem de programação",
      "Um framework JavaScript"
    ],
    correctAnswer: 1,
    explanation: "REST (Representational State Transfer) é um padrão arquitetural para APIs web que usa métodos HTTP padrão.",
    difficulty: 'médio',
    topic: 'Web APIs'
  }
];

const Quiz = ({ onComplete }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const { playHover, playHit, playSuccess } = useAudio();

  const question = programmingQuestions[currentQuestion];
  const totalQuestions = programmingQuestions.length;

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    
    if (answerIndex === question.correctAnswer) {
      setScore(score + 1);
      playSuccess();
    } else {
      playHit();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
      onComplete?.(score + (selectedAnswer === question.correctAnswer ? 1 : 0), totalQuestions);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowExplanation(false);
    setQuizCompleted(false);
    setAnswers([]);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'fácil': return '#4ade80';
      case 'médio': return '#facc15';
      case 'difícil': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 80) return "Excelente! Você domina bem a programação! 🚀";
    if (percentage >= 60) return "Muito bom! Continue estudando para aperfeiçoar! 💪";
    if (percentage >= 40) return "Bom trabalho! Há espaço para melhorar! 📚";
    return "Continue estudando! A prática leva à perfeição! 🌱";
  };

  if (quizCompleted) {
    const finalScore = score + (selectedAnswer === question.correctAnswer ? 1 : 0);
    const percentage = Math.round((finalScore / totalQuestions) * 100);
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <GlowCard className="p-8 max-w-2xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-3xl font-orbitron font-bold text-white mb-4">
              Quiz <span className="text-neon-green">Concluído!</span>
            </h3>
            
            <div className="mb-6">
              <div className="text-6xl font-bold text-neon-green mb-2">
                {percentage}%
              </div>
              <div className="text-xl text-white mb-4">
                {finalScore} de {totalQuestions} questões corretas
              </div>
              <p className="text-white/70 text-lg">
                {getScoreMessage(percentage)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-black/30 rounded-lg p-4">
                <div className="text-green-400 text-2xl font-bold">{answers.filter((answer, index) => answer === programmingQuestions[index].correctAnswer).length}</div>
                <div className="text-white/60 text-sm">Corretas</div>
              </div>
              <div className="bg-black/30 rounded-lg p-4">
                <div className="text-red-400 text-2xl font-bold">{answers.filter((answer, index) => answer !== programmingQuestions[index].correctAnswer).length}</div>
                <div className="text-white/60 text-sm">Incorretas</div>
              </div>
              <div className="bg-black/30 rounded-lg p-4">
                <div className="text-neon-green text-2xl font-bold">{percentage}%</div>
                <div className="text-white/60 text-sm">Aproveitamento</div>
              </div>
            </div>

            <button
              onClick={resetQuiz}
              onMouseEnter={() => playHover()}
              className="bg-neon-green text-black px-6 py-3 rounded-lg font-orbitron font-semibold hover:bg-neon-green/80 transition-all duration-300"
            >
              Tentar Novamente
            </button>
          </motion.div>
        </GlowCard>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-4">
          <span className="text-white font-orbitron">
            Pergunta {currentQuestion + 1} de {totalQuestions}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-sm">Tópico:</span>
            <span className="text-neon-green font-semibold">{question.topic}</span>
          </div>
        </div>
        
        <div className="w-full bg-black/50 rounded-full h-3 mb-2">
          <motion.div
            className="h-3 bg-gradient-to-r from-neon-green to-green-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-sm">Dificuldade:</span>
            <span 
              className="text-sm font-semibold px-2 py-1 rounded"
              style={{ 
                color: getDifficultyColor(question.difficulty),
                backgroundColor: `${getDifficultyColor(question.difficulty)}20`
              }}
            >
              {question.difficulty}
            </span>
          </div>
          <span className="text-neon-green font-semibold">
            Pontuação: {score}/{currentQuestion + (selectedAnswer !== null ? 1 : 0)}
          </span>
        </div>
      </motion.div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <GlowCard className="p-8 mb-6">
            <h3 className="text-xl md:text-2xl font-orbitron text-white mb-6 leading-relaxed">
              {question.question}
            </h3>
            
            <div className="grid gap-4">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  onMouseEnter={() => playHover()}
                  disabled={selectedAnswer !== null}
                  whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    p-4 rounded-lg border-2 text-left transition-all duration-300 
                    ${selectedAnswer === null 
                      ? 'border-white/20 hover:border-neon-green/50 bg-black/20 hover:bg-black/40' 
                      : selectedAnswer === index
                        ? index === question.correctAnswer
                          ? 'border-green-500 bg-green-500/20 text-green-300'
                          : 'border-red-500 bg-red-500/20 text-red-300'
                        : index === question.correctAnswer
                          ? 'border-green-500 bg-green-500/20 text-green-300'
                          : 'border-white/10 bg-black/10 text-white/60'
                    }
                    ${selectedAnswer === null ? 'cursor-pointer' : 'cursor-default'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold
                      ${selectedAnswer === null 
                        ? 'border-white/40 text-white/60' 
                        : selectedAnswer === index
                          ? index === question.correctAnswer
                            ? 'border-green-500 bg-green-500 text-white'
                            : 'border-red-500 bg-red-500 text-white'
                          : index === question.correctAnswer
                            ? 'border-green-500 bg-green-500 text-white'
                            : 'border-white/20 text-white/40'
                      }
                    `}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="flex-1">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </GlowCard>
        </motion.div>
      </AnimatePresence>

      {/* Explanation */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6"
          >
            <GlowCard className="p-6 border-l-4 border-l-neon-green">
              <h4 className="text-neon-green font-orbitron font-semibold mb-2">
                Explicação:
              </h4>
              <p className="text-white/80 leading-relaxed">
                {question.explanation}
              </p>
            </GlowCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Button */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <button
              onClick={handleNextQuestion}
              onMouseEnter={() => playHover()}
              className="bg-neon-green text-black px-8 py-3 rounded-lg font-orbitron font-semibold hover:bg-neon-green/80 transition-all duration-300 inline-flex items-center gap-2"
            >
              {currentQuestion < totalQuestions - 1 ? 'Próxima Pergunta' : 'Finalizar Quiz'}
              <span className="text-lg">→</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;