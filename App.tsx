import React, { useState, useCallback } from 'react';
import { QuizQuestion, GameState } from './types';
import { generateQuizQuestions } from './services/geminiService';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import LoadingScreen from './components/LoadingScreen';
import { QUIZ_LENGTH } from './constants';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const startQuiz = useCallback(async () => {
    setGameState('loading');
    setError(null);
    try {
      const newQuestions = await generateQuizQuestions();
      if (newQuestions.length === 0) {
        throw new Error('AIから問題を取得できませんでした。もう一度お試しください。');
      }
      setQuestions(newQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setGameState('quiz');
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました。');
      setGameState('start');
    }
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameState('results');
    }
  };

  const restartQuiz = () => {
    setGameState('start');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setError(null);
  };

  const renderScreen = () => {
    switch (gameState) {
      case 'loading':
        return <LoadingScreen />;
      case 'quiz':
        return (
          <QuizScreen
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
          />
        );
      case 'results':
        return <ResultScreen score={score} totalQuestions={questions.length} onRestart={restartQuiz} />;
      case 'start':
      default:
        return <StartScreen onStart={startQuiz} error={error} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex flex-col items-center justify-center p-4 font-sans text-gray-800">
      <div className="w-full max-w-2xl mx-auto">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
