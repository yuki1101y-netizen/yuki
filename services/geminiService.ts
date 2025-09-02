import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from '../types';
import { QUIZ_LENGTH } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function generateQuizQuestions(): Promise<QuizQuestion[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `日本の医薬品登録販売者試験のクイズを${QUIZ_LENGTH}問、ランダムなトピックで生成してください。各問題には4つの選択肢（A, B, C, D）と、正解、そして詳しい解説を付けてください。解説は、なぜその選択肢が正解で、他の選択肢がなぜ間違いなのかを明確に説明してください。`,
      config: {
        systemInstruction: "あなたは日本の医薬品登録販売者試験のエキスパートです。膨大な過去問題の知識に基づき、受験者が楽しく効果的に学習できるような、質の高いクイズを生成してください。",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: {
                type: Type.STRING,
                description: '問題文'
              },
              options: {
                type: Type.OBJECT,
                properties: {
                  A: { type: Type.STRING },
                  B: { type: Type.STRING },
                  C: { type: Type.STRING },
                  D: { type: Type.STRING }
                },
                required: ['A', 'B', 'C', 'D']
              },
              answer: {
                type: Type.STRING,
                description: '正解の選択肢 (A, B, C, Dのいずれか)'
              },
              explanation: {
                type: Type.STRING,
                description: '正解と不正解の理由を説明する詳しい解説'
              }
            },
            required: ['question', 'options', 'answer', 'explanation']
          }
        },
      },
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);
    
    // Validate that the parsed data is an array of questions
    if (Array.isArray(parsedData) && parsedData.every(item => 'question' in item && 'options' in item)) {
        return parsedData as QuizQuestion[];
    } else {
        throw new Error("APIから返されたデータの形式が不正です。");
    }
  } catch (error) {
    console.error("Error generating quiz questions:", error);
    throw new Error("クイズの生成中にエラーが発生しました。");
  }
}
