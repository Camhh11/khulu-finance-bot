// services/openai.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getAIResponse(userMessage) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or another model you prefer
      messages: [
        { role: "user", content: userMessage }
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI error:", error.response?.data || error.message);
    return "Sorry, something went wrong while trying to help you. Please try again later.";
  }
}
