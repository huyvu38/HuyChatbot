import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {askResume} from "./lib/rag";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 8000;

// Middleware
app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON bodies

// Routes
app.post("/api/chat", async (req, res) => {
    const {question} = req.body;

    if (!question) {
        return res.status(400).json({error: "Missing question in request body."});
    }

    try {
        const answer = await askResume(question);
        res.json({response: answer});
    } catch (err) {
        console.error("❌ Error in /api/chat:", err);
        res.status(500).json({error: "Failed to generate response."});
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
