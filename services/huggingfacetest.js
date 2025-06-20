// huggingface-test.js
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
// Use a valid model, e.g., Mixtral or a smaller one for quicker tests
const endpoint = "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1";

const userMessage = "How can I save money as a student in South Africa?";

async function queryHuggingFace(message) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: message }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  console.log("🧠 Hugging Face Response:", data);
}

queryHuggingFace(userMessage).catch(console.error);
