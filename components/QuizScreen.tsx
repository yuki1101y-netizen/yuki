import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';

interface QuizScreenProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

type OptionKey = 'A' | 'B' | 'C' | 'D';

const QuizScreen: React.FC<QuizScreenProps> = ({ question, questionNumber, totalQuestions, onAnswer, onNext }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<OptionKey | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [question]);

  const handleSelectAnswer = (option: OptionKey) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedAnswer(option);
    onAnswer(option === question.answer);
  };

  const getButtonClass = (option: OptionKey) => {
    if (!isAnswered) {
      return 'bg-white hover:bg-blue-50 text-blue-800 border-blue-200';
    }
    if (option === question.answer) {
      return 'bg-green-100 text-green-800 border-green-300 transform scale-105';
    }
    if (option === selectedAnswer) {
      return 'bg-red-100 text-red-800 border-red-300';
    }
    return 'bg-gray-100 text-gray-500 border-gray-200 opacity-70';
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full animate-fade-in">
      <div className="mb-6">
        <p className="text-sm text-gray-500">
          問題 {questionNumber} / {totalQuestions}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
          <div
            className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6" style={{ whiteSpace: 'pre-wrap' }}>
        {question.question}
      </h2>

      <div className="space-y-4">
        {(Object.keys(question.options) as OptionKey[]).map((key) => (
          <button
            key={key}
            onClick={() => handleSelectAnswer(key)}
            disabled={isAnswered}
            className={`w-full text-left p-4 rounded-lg border-2 font-medium transition-all duration-300 flex items-start ${getButtonClass(key)}`}
          >
            <span className="font-bold mr-3">{key}.</span>
            <span style={{ whiteSpace: 'pre-wrap' }}>{question.options[key]}</span>
          </button>
        ))}
      </div>

      {isAnswered && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-fade-in-up">
          <h3 className="text-lg font-bold mb-2 text-gray-800">
            {selectedAnswer === question.answer ? '正解！' : '不正解…'}
          </h3>
          <p className="text-gray-700 mb-4">
            正解は <strong className="text-xl text-blue-600">{question.answer}</strong> です。
          </p>
          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-semibold text-gray-600 mb-2">解説</h4>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ whiteSpace: 'pre-wrap' }}>
              {question.explanation}
            </p>
          </div>
          <button
            onClick={onNext}
            className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105"
          >
            {questionNumber === totalQuestions ? '結果を見る' : '次の問題へ'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizScreen;
