// Imports & Setup
const express = require("express");
const cors = require("cors"); // Allows our backend and frontend to connect
const dotenv = require("dotenv"); // Loads our .env with our API key
const OpenAI = require("openai"); // Used to access openAI
const authRoutes = require("./routes/auth");
const app = express();
const spotifyRoutes = require("./routes/spotify");

dotenv.config(); // loads our .env file

const corsOptions = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/spotify", spotifyRoutes);

// Creates our openAI bot with the key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// we choose to post info at /api/generate-tags
app.post("/api/generate-tags", async (req, res) => {
  try {
    // runs our chatgpt response
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that turns user prompts into 3 Spotify genres",
        },
        {
          role: "user",
          content: `User prompt: "${req.body.prompt}"\nGive me output with just genres separated by spaces`, // we send in our prompt here
        },
      ],
    });
    // sends us back openAI's response
    res.json({ response: chatCompletion.choices[0].message.content });
  } catch (err) {
    console.error("❌ FULL OpenAI Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// this will start our server
app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
