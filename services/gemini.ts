
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getCoffeeRecommendation = async (base64Image?: string, textPrompt?: string) => {
  const ai = getAI();
  const model = 'gemini-3-flash-preview';

  const parts: any[] = [];
  if (base64Image) {
    parts.push({
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64Image
      }
    });
  }
  
  const prompt = textPrompt 
    ? `Based on this vibe or text: "${textPrompt}", recommend exactly one specific coffee drink from our menu (Caffe Mocha, Flat White, Vanilla Latte, Caramel Macchiato). Return a JSON object.`
    : "Based on this image, what's the perfect coffee recommendation? Choose from (Caffe Mocha, Flat White, Vanilla Latte, Caramel Macchiato). Return a JSON object.";

  parts.push({ text: prompt });

  try {
    const response = await ai.models.generateContent({
      model,
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedCoffee: { type: Type.STRING, description: 'The name of the coffee recommended' },
            reasoning: { type: Type.STRING, description: 'A short catchy reason why this fits the user' },
          },
          required: ['recommendedCoffee', 'reasoning']
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return { recommendedCoffee: 'Caffe Mocha', reasoning: 'Our signature classic!' };
  }
};
