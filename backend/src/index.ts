import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {askResume} from "./lib/rag";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

// Routes
app.post("/api/chat", async (req, res) => {
    const {question} = req.body;

    if (!question) {
        return res.status(400).json({error: "Missing question in request body."});
    }
    try {
        const answer = await askResume(question);
        res.json({response: answer});
        console.log(answer);
    } catch (err) {
        console.error("❌ Error in /api/chat:", err);
        res.status(500).json({error: "Failed to generate response."});
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
