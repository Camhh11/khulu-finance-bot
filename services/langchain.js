import { HuggingFaceInference } from "@langchain/community/llms/hf";
import dotenv from "dotenv";
dotenv.config();

const model = new HuggingFaceInference({
  model: "mistralai/Mistral-7B-Instruct-v0.1",
  apiKey: process.env.HUGGINGFACE_API_KEY,
});

export async function getLangchainResponse(message) {
  try {
    const systemPrompt = `
You are Khulu, a wise and friendly South African AI coach helping young people with money.
Give kind, clear advice in everyday language. Keep it real, short, and avoid big words or risky ideas.`;

    const prompt = `${systemPrompt}\n\nUser: ${message}\nKhulu:`;
    const response = await model.invoke(prompt);
    return response.trim();
  } catch (error) {
    console.error("LangChain HF error:", error.message);
    return "Sorry, Khulu got stuck. Try again soon.";
  }
}
