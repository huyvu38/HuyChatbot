import OpenAI from "openai";
import {pinecone} from "./pinecone";
import * as dotenv from "dotenv";

dotenv.config();

// 1. Your resume chunks — you can also load from a file
const resumeChunks = [
    "Huy Vu is a Computer Science undergraduate at Purdue University...",
    "Worked as a software engineer intern at Hyperlogy...",
    "Built AI chatbot using OpenAI, integrated with Node.js and Express...",
    "Skills include JavaScript, Python, TypeScript, and more...",
];

// 2. Create OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

async function embedAndUpsert() {
    // 3. Generate embeddings for all chunks
    const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: resumeChunks,
    });

    const vectors = response.data.map((item, i) => ({
        id: `chunk-${i}`,
        values: item.embedding,
        metadata: {text: resumeChunks[i]},
    }));

    // 4. Upsert to Pinecone
    const index = pinecone.Index(process.env.PINECONE_INDEX!);
    await index.upsert(vectors);

    console.log("✅ Resume chunks embedded and uploaded to Pinecone.");
}

// 5. Run the script
embedAndUpsert().catch(console.error);
