import React, { useState, useEffect } from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
);

const loadingMessages = [
  "AIが過去問を分析中です...",
  "最適な問題を厳選しています...",
  "クイズの準備をしています...",
  "もうしばらくお待ちください...",
];

const LoadingScreen: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-xl shadow-lg">
      <LoadingSpinner />
      <h2 className="text-xl font-semibold text-gray-700 mt-6">
        問題を作成中
      </h2>
      <p className="text-gray-500 mt-2 transition-opacity duration-500">
        {loadingMessages[messageIndex]}
      </p>
    </div>
  );
};

export default LoadingScreen;
