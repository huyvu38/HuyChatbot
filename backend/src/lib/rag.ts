import OpenAI from "openai";
import {pinecone} from "./pinecone";
import * as dotenv from "dotenv";

dotenv.config();

// 1. Init OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

// 2. Answer a question using RAG
export async function askResume(question: string): Promise<string> {
    // Embed the user question
    const embedResponse = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: question,
    });

    const queryVector = embedResponse.data[0].embedding;

    // Query Pinecone with embedded question
    const index = pinecone.Index(process.env.PINECONE_INDEX!);
    const results = await index.query({
        vector: queryVector,
        topK: 5,
        includeMetadata: true,
    });

    // Extract top matching resume chunks
    const context = results.matches
        .map((match) => match.metadata?.text || "")
        .join("\n");

    // Use GPT to generate answer based on context
    const chatResponse = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant. Only answer using the provided resume context.",
            },
            {
                role: "user",
                content: `Context:\n${context}\n\nQuestion:\n${question}`,
            },
        ],
    });

    return chatResponse.choices[0].message.content || "No answer.";
}
