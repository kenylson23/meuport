import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlowCard from "../ui/GlowCard";
import { useAudio } from "../../lib/stores/useAudio";
import { generateQuizQuestions, QuizQuestion, QuizGenerationOptions } from "../../lib/openai";

interface AIQuizProps {
  onComplete?: (score: number, total: number) => void;
}

const AIQuiz = ({ onComplete }: AIQuizProps) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quizConfig, setQuizConfig] = useState({
    difficulty: 'misto' as 'fácil' | 'médio' | 'difícil' | 'misto',
    questionCount: 5,
    topics: [] as string[]
  });
  const [showConfig, setShowConfig] = useState(true);
  const { playHover, playHit, playSuccess } = useAudio();

  const availableTopics = [
    'JavaScript', 'TypeScript', 'React', 'Python', 'SQL', 
    'Node.js', 'CSS', 'HTML', 'Algoritmos', 'Estruturas de Dados',
    'Git', 'APIs REST', 'Programação Orientada a Objetos'
  ];

  const generateQuiz = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const options: QuizGenerationOptions = {
        count: quizConfig.questionCount,
        difficulty: quizConfig.difficulty,
        topics: quizConfig.topics.length > 0 ? quizConfig.topics : undefined
      };
      
      const generatedQuestions = await generateQuizQuestions(options);
      setQuestions(generatedQuestions);
      setShowConfig(false);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setScore(0);
      setShowExplanation(false);
      setQuizCompleted(false);
      setAnswers([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao gerar quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      playSuccess();
    } else {
      playHit();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
      onComplete?.(score, questions.length);
    }
  };

  const resetQuiz = () => {
    setShowConfig(true);
    setQuestions([]);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowExplanation(false);
    setQuizCompleted(false);
    setAnswers([]);
    setError(null);
  };

  const toggleTopic = (topic: string) => {
    setQuizConfig(prev => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter(t => t !== topic)
        : [...prev.topics, topic]
    }));
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

  // Configuration Screen
  if (showConfig) {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl font-orbitron font-bold text-white mb-4">
            Configurar <span className="text-neon-green">Quiz IA</span>
          </h3>
          <p className="text-white/70">
            Personalize seu quiz com IA para uma experiência única a cada vez
          </p>
        </motion.div>

        <GlowCard className="p-8">
          <div className="space-y-6">
            {/* Difficulty Selection */}
            <div>
              <label className="block text-white font-orbitron font-semibold mb-3">
                Dificuldade
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['fácil', 'médio', 'difícil', 'misto'].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setQuizConfig(prev => ({ ...prev, difficulty: diff as any }))}
                    onMouseEnter={() => playHover()}
                    className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                      quizConfig.difficulty === diff
                        ? 'border-neon-green bg-neon-green/20 text-neon-green'
                        : 'border-white/20 hover:border-neon-green/50 text-white/70'
                    }`}
                  >
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count */}
            <div>
              <label className="block text-white font-orbitron font-semibold mb-3">
                Número de Perguntas: {quizConfig.questionCount}
              </label>
              <input
                type="range"
                min="3"
                max="10"
                value={quizConfig.questionCount}
                onChange={(e) => setQuizConfig(prev => ({ ...prev, questionCount: parseInt(e.target.value) }))}
                className="w-full h-2 bg-black/50 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-white/60 mt-1">
                <span>3</span>
                <span>10</span>
              </div>
            </div>

            {/* Topic Selection */}
            <div>
              <label className="block text-white font-orbitron font-semibold mb-3">
                Tópicos (deixe vazio para tópicos aleatórios)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {availableTopics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    onMouseEnter={() => playHover()}
                    className={`p-2 rounded-lg border text-sm transition-all duration-300 ${
                      quizConfig.topics.includes(topic)
                        ? 'border-neon-green bg-neon-green/20 text-neon-green'
                        : 'border-white/20 hover:border-neon-green/50 text-white/70'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
                <p className="text-red-300">{error}</p>
              </div>
            )}

            <button
              onClick={generateQuiz}
              disabled={loading}
              onMouseEnter={() => playHover()}
              className="w-full bg-neon-green text-black py-4 rounded-lg font-orbitron font-bold text-lg hover:bg-neon-green/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin w-5 h-5 border-2 border-black/30 border-t-black rounded-full"></div>
                  Gerando Quiz com IA...
                </div>
              ) : (
                'Gerar Quiz Personalizado'
              )}
            </button>
          </div>
        </GlowCard>
      </div>
    );
  }

  // Loading Screen
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center h-64">
        <GlowCard className="p-8 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-neon-green/30 border-t-neon-green rounded-full mx-auto mb-4"></div>
          <p className="text-white font-orbitron text-lg">
            Gerando perguntas com IA...
          </p>
          <p className="text-white/60 text-sm mt-2">
            Criando {quizConfig.questionCount} perguntas personalizadas
          </p>
        </GlowCard>
      </div>
    );
  }

  // Completion Screen
  if (quizCompleted) {
    const finalScore = score;
    const percentage = Math.round((finalScore / questions.length) * 100);
    
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
              Quiz IA <span className="text-neon-green">Concluído!</span>
            </h3>
            
            <div className="mb-6">
              <div className="text-6xl font-bold text-neon-green mb-2">
                {percentage}%
              </div>
              <div className="text-xl text-white mb-4">
                {finalScore} de {questions.length} questões corretas
              </div>
              <p className="text-white/70 text-lg">
                {getScoreMessage(percentage)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-black/30 rounded-lg p-4">
                <div className="text-green-400 text-2xl font-bold">{answers.filter((answer, index) => answer === questions[index].correctAnswer).length}</div>
                <div className="text-white/60 text-sm">Corretas</div>
              </div>
              <div className="bg-black/30 rounded-lg p-4">
                <div className="text-red-400 text-2xl font-bold">{answers.filter((answer, index) => answer !== questions[index].correctAnswer).length}</div>
                <div className="text-white/60 text-sm">Incorretas</div>
              </div>
              <div className="bg-black/30 rounded-lg p-4">
                <div className="text-neon-green text-2xl font-bold">{percentage}%</div>
                <div className="text-white/60 text-sm">Aproveitamento</div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={resetQuiz}
                onMouseEnter={() => playHover()}
                className="bg-neon-green text-black px-6 py-3 rounded-lg font-orbitron font-semibold hover:bg-neon-green/80 transition-all duration-300"
              >
                Novo Quiz
              </button>
              <button
                onClick={generateQuiz}
                onMouseEnter={() => playHover()}
                className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded-lg font-orbitron font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Mesma Configuração
              </button>
            </div>
          </motion.div>
        </GlowCard>
      </motion.div>
    );
  }

  // Quiz Questions
  if (questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <GlowCard className="p-8">
          <p className="text-white">Nenhuma pergunta gerada. Tente novamente.</p>
          <button
            onClick={resetQuiz}
            className="mt-4 bg-neon-green text-black px-6 py-3 rounded-lg font-orbitron font-semibold"
          >
            Voltar
          </button>
        </GlowCard>
      </div>
    );
  }

  const question = questions[currentQuestion];

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
            Pergunta {currentQuestion + 1} de {questions.length}
          </span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-sm">Tópico:</span>
              <span className="text-neon-green font-semibold">{question.topic}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-sm">IA:</span>
              <span className="text-neon-green font-semibold">Ativa</span>
            </div>
          </div>
        </div>
        
        <div className="w-full bg-black/50 rounded-full h-3 mb-2">
          <motion.div
            className="h-3 bg-gradient-to-r from-neon-green to-green-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
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
              {currentQuestion < questions.length - 1 ? 'Próxima Pergunta' : 'Finalizar Quiz'}
              <span className="text-lg">→</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIQuiz;