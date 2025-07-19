const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const corsOptions = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  methods: ["GET", "POST"],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log("Using API key:", process.env.OPENAI_API_KEY);

app.post("/api/generate-tags", async (req, res) => {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Say hello!" }],
    });

    res.json({ response: chatCompletion.choices[0].message.content });
  } catch (err) {
    console.error("❌ FULL OpenAI Error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
