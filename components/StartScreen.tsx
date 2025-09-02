import React from 'react';

interface StartScreenProps {
  onStart: () => void;
  error: string | null;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, error }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg text-center animate-fade-in-up">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        登録販売者 AI学習クイズ
      </h1>
      <p className="text-gray-600 mb-8">
        AIが過去問を分析して作成した問題で、あなたの知識を試しましょう！
      </p>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
          <strong className="font-bold">エラー: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <button
        onClick={onStart}
        className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-12 rounded-lg text-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        クイズを始める ({'10問'})
      </button>
    </div>
  );
};

export default StartScreen;
