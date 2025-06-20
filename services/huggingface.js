// services/huggingface.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1";;

export async function getAIResponseFromHF(userMessage) {
  const systemPrompt = `
You are Khulu, a friendly and wise South African financial coach.
You help young people who are new to earning money.
Give short, kind advice using examples from everyday SA life (e.g., airtime, Capitec, Shoprite).
Avoid fancy words, keep it real, and never promote mashonisa loans or gambling.
`;

  const input = `${systemPrompt}\n\nUser: ${userMessage}\nKhulu:`;

  try {
    const response = await axios.post(
      API_URL,
      { inputs: input },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const fullText = response.data?.[0]?.generated_text || "";
    const reply = fullText.split("Khulu:")[1]?.trim().split("\n")[0]; // clean first line only

    return reply || "Sorry, Khulu got confused. Try again.";
  } catch (error) {
    console.error("💥 Hugging Face API error:", error.message);
    return "Sorry, something went wrong while trying to help you. Please try again later.";
  }
}
