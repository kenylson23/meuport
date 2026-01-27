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
    id: 7,
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
      onComplete?.(score, totalQuestions);
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
    const finalScore = score;
    const percentage = Math.round((finalScore / totalQuestions) * 100);
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center font-sans"
      >
        <GlowCard className="p-8 max-w-2xl mx-auto border-neon-green/30">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-3xl font-orbitron font-bold text-white mb-4 tracking-tighter uppercase">
              Quiz <span className="text-neon-green glow-text">Concluído!</span>
            </h3>
            
            <div className="mb-8">
              <div className="text-7xl font-bold text-neon-green mb-2 drop-shadow-[0_0_15px_rgba(57,255,20,0.5)]">
                {percentage}%
              </div>
              <div className="text-xl text-white/90 font-medium mb-4">
                {finalScore} de {totalQuestions} questões corretas
              </div>
              <p className="text-white/70 text-lg leading-relaxed max-w-md mx-auto">
                {getScoreMessage(percentage)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-xl p-4 shadow-inner">
                <div className="text-green-400 text-3xl font-bold">{answers.filter((answer, index) => answer === programmingQuestions[index].correctAnswer).length}</div>
                <div className="text-white/50 text-[10px] uppercase tracking-widest font-bold mt-1">Corretas</div>
              </div>
              <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-xl p-4 shadow-inner">
                <div className="text-red-400 text-3xl font-bold">{answers.filter((answer, index) => answer !== programmingQuestions[index].correctAnswer).length}</div>
                <div className="text-white/50 text-[10px] uppercase tracking-widest font-bold mt-1">Incorretas</div>
              </div>
              <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-xl p-4 shadow-inner">
                <div className="text-neon-green text-3xl font-bold">{percentage}%</div>
                <div className="text-white/50 text-[10px] uppercase tracking-widest font-bold mt-1">Score</div>
              </div>
            </div>

            <button
              onClick={resetQuiz}
              onMouseEnter={() => playHover()}
              className="bg-neon-green text-black px-10 py-4 rounded-full font-orbitron font-black uppercase tracking-widest hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(57,255,20,0.4)]"
            >
              Tentar Novamente
            </button>
          </motion.div>
        </GlowCard>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto font-sans">
      {/* Progress Bar Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="flex justify-between items-end mb-4">
          <div className="space-y-1">
            <span className="text-neon-green/60 text-[10px] uppercase tracking-[0.2em] font-black">Progresso do Teste</span>
            <h4 className="text-white font-orbitron text-xl font-bold">
              Questão <span className="text-neon-green">{currentQuestion + 1}</span><span className="text-white/30"> / {totalQuestions}</span>
            </h4>
          </div>
          <div className="text-right">
             <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-black block">Domínio Técnico</span>
             <span className="text-neon-green font-bold text-sm tracking-tight">{question.topic}</span>
          </div>
        </div>
        
        <div className="w-full bg-white/5 border border-white/10 rounded-full h-2 overflow-hidden backdrop-blur-sm">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-green via-green-400 to-neon-green bg-[length:200%_auto] shadow-[0_0_15px_rgba(57,255,20,0.5)]"
            initial={{ width: 0 }}
            animate={{ 
              width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
              backgroundPosition: ["0% center", "100% center"]
            }}
            transition={{ 
              width: { duration: 0.5 },
              backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" }
            }}
          />
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-3">
            <div 
              className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border"
              style={{ 
                color: getDifficultyColor(question.difficulty),
                borderColor: `${getDifficultyColor(question.difficulty)}40`,
                backgroundColor: `${getDifficultyColor(question.difficulty)}10`
              }}
            >
              {question.difficulty}
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
            <span className="text-white/50 text-[10px] uppercase tracking-widest font-black mr-2">Score Atual:</span>
            <span className="text-neon-green font-black text-sm">{score}</span>
          </div>
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
          <GlowCard className="p-8 md:p-12 mb-8 border-neon-green/20">
            <h3 className="text-2xl md:text-3xl font-orbitron font-bold text-white mb-10 leading-tight tracking-tight">
              {question.question}
            </h3>
            
            <div className="grid gap-4">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  onMouseEnter={() => playHover()}
                  disabled={selectedAnswer !== null}
                  whileHover={{ scale: selectedAnswer === null ? 1.01 : 1, x: selectedAnswer === null ? 5 : 0 }}
                  whileTap={{ scale: 0.99 }}
                  className={`
                    p-6 rounded-xl border transition-all duration-300 text-left relative overflow-hidden group
                    ${selectedAnswer === null 
                      ? 'border-white/10 hover:border-neon-green/50 bg-white/[0.03] hover:bg-white/[0.08]' 
                      : selectedAnswer === index
                        ? index === question.correctAnswer
                          ? 'border-green-500/50 bg-green-500/10 text-green-300 shadow-[0_0_20px_rgba(34,197,94,0.1)]'
                          : 'border-red-500/50 bg-red-500/10 text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.1)]'
                        : index === question.correctAnswer
                          ? 'border-green-500/50 bg-green-500/10 text-green-300'
                          : 'border-white/5 bg-white/[0.01] text-white/30'
                    }
                    ${selectedAnswer === null ? 'cursor-pointer' : 'cursor-default'}
                  `}
                >
                  <div className="flex items-center gap-5 relative z-10">
                    <div className={`
                      w-10 h-10 rounded-lg border-2 flex items-center justify-center text-lg font-black font-orbitron transition-all duration-500
                      ${selectedAnswer === null 
                        ? 'border-white/20 text-white/40 group-hover:border-neon-green group-hover:text-neon-green' 
                        : selectedAnswer === index
                          ? index === question.correctAnswer
                            ? 'border-green-500 bg-green-500 text-white'
                            : 'border-red-500 bg-red-500 text-white'
                          : index === question.correctAnswer
                            ? 'border-green-500 bg-green-500 text-white'
                            : 'border-white/10 text-white/20'
                      }
                    `}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="flex-1 text-lg font-medium leading-snug">{option}</span>
                  </div>
                  {/* Hover effect background */}
                  {selectedAnswer === null && (
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  )}
                </motion.button>
              ))}
            </div>
          </GlowCard>
        </motion.div>
      </AnimatePresence>

      {/* Explanation & Next Button */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="bg-black/40 backdrop-blur-xl border-l-4 border-l-neon-green border border-white/5 rounded-r-2xl p-8 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-neon-green/5 blur-3xl rounded-full -mr-16 -mt-16" />
              <h4 className="text-neon-green font-orbitron font-black text-xs uppercase tracking-[0.3em] mb-3">
                Protocolo de Resposta:
              </h4>
              <p className="text-white/90 text-lg leading-relaxed font-medium italic">
                "{question.explanation}"
              </p>
            </div>

            <div className="text-center pb-12">
              <button
                onClick={handleNextQuestion}
                onMouseEnter={() => playHover()}
                className="group bg-white text-black px-12 py-5 rounded-full font-orbitron font-black uppercase tracking-[0.2em] hover:bg-neon-green hover:scale-105 transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center gap-3 mx-auto"
              >
                {currentQuestion < totalQuestions - 1 ? 'Próximo Protocolo' : 'Finalizar Análise'}
                <motion.span 
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-2xl"
                >
                  →
                </motion.span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
