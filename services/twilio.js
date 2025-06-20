// services/twilio.js

import { config } from "dotenv";
import twilio from "twilio";

config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function sendMessage(to, body) {
  try {
    const message = await client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number (e.g. whatsapp:+14155238886)
      to,                                     // Recipient (e.g. whatsapp:+27xxxxxxxxx)
      body
    });
    console.log("✅ Message sent:", message.sid);
  } catch (err) {
    console.error("❌ Failed to send message:", err.message);
  }
}
