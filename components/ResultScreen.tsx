import React from 'react';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  const getResultMessage = () => {
    if (percentage === 100) return "完璧です！素晴らしい！";
    if (percentage >= 80) return "素晴らしい成績です！";
    if (percentage >= 60) return "良い調子です！このまま頑張ろう！";
    if (percentage >= 40) return "もう少し！復習が大切です。";
    return "お疲れ様でした！次回はもっと頑張ろう！";
  };
  
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg text-center animate-fade-in-up">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">結果発表</h2>
      <p className="text-lg text-gray-600 mb-6">
        あなたのスコアは...
      </p>
      <div className="mb-6">
        <span className="text-6xl font-bold text-blue-500">{score}</span>
        <span className="text-2xl text-gray-500"> / {totalQuestions}問正解</span>
      </div>
      <p className="text-xl font-semibold text-gray-700 mb-8">
        {getResultMessage()}
      </p>
      <button
        onClick={onRestart}
        className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-12 rounded-lg text-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
      >
        もう一度挑戦する
      </button>
    </div>
  );
};

export default ResultScreen;
