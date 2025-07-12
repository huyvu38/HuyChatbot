import OpenAI from "openai";
import {pinecone} from "./pinecone";
import * as dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
export async function askResume(question) {
    const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: question,
    });
    const queryEmbedding = embeddingResponse.data[0].embedding;
    const index = pinecone.Index(process.env.PINECONE_INDEX);
    // ✅ Cast the request object directly to fix TS error
    const queryResponse = await index.query({
        vector: queryEmbedding,
        topK: 5,
        namespace: "", // required in v1
        includeMetadata: true,
    }); // <== force bypasses type mismatch
    //  👆 Only needed because SDK v1 has loose or missing types
    const context = queryResponse.matches
        ?.map((match) => match.metadata?.text ?? "")
        .join("\n") ?? "";
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
    return chatResponse.choices[0].message.content ?? "No answer found.";
}
