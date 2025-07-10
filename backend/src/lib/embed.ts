import OpenAI from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const resumeChunks = [
    "Huy Vu is a Computer Science undergraduate at Purdue University...",
    "Worked as a software engineer intern at Hyperlogy...",
    "Built AI chatbot using OpenAI, integrated with Node.js and Express...",
    "Skills include JavaScript, Python, TypeScript, and more...",
];

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

async function embedAndUpsert() {
    const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: resumeChunks,
    });

    const vectors = response.data.map((item, i) => ({
        id: `chunk-${i}`,
        values: item.embedding,
        metadata: { text: resumeChunks[i] },
    }));

    console.log("✅ Resume chunks embedded and uploaded to Pinecone.");
}

embedAndUpsert().catch(console.error);
