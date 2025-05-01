import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyCwHvqQw5JKrNZHBp_kWU5pe15k7g74a_k" });

export async function getGeminiResponse(userQuery: string):  Promise<string | undefined> {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: userQuery }] }],
    });

     const text =response?.candidates?.[0]?.content?.parts?.[0]?.text || " " ;
     const cleanText = text
     .replace(/\n/g, " ")    // Remove new lines
     .replace(/\*/g, "")     // Remove asterisks (markdown bold, bullet points)
     .replace(/\s+/g, " ")   // Collapse multiple spaces
     .trim(); 

     return cleanText;

  } catch (error) {
    console.error("Error fetching Gemini response:", error);
  }
}
