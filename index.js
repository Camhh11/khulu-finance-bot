// index.js
import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { getAIResponseFromHF } from "./services/huggingface.js";
import { sendMessage } from "./services/twilio.js";

config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/webhook", async (req, res) => {
  try {
    const incomingMessage = req.body.Body;
    const from = req.body.From;

    console.log("📩 Message received:", incomingMessage);

    if (!incomingMessage || !from) {
      console.warn("⚠️ Missing message or sender info");
      return res.status(400).end();
    }

    const aiReply = await getAIResponseFromHF(incomingMessage);
    await sendMessage(from, aiReply);

    // ✅ Tell Twilio we handled it, no need to respond
    res.status(204).end(); // No Content = Twilio won’t send "OK"
  } catch (error) {
    console.error("💥 Error handling webhook:", error.message);

    // Optional: let user know something went wrong
    if (req.body.From) {
      await sendMessage(req.body.From, "Sorry, something went wrong. Please try again.");
    }

    res.status(204).end();
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
