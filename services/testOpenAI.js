import 'dotenv/config';
import OpenAI from "openai";

async function testOpenAI() {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Hello from OpenAI 5.x!" }],
    });

    console.log("OpenAI response:", completion.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

testOpenAI();
