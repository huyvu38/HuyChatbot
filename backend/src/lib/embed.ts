import OpenAI from "openai";
import {pinecone} from "./pinecone";
import * as dotenv from "dotenv";

dotenv.config();

const resumeChunks = [
    "Huy Vu is a Computer Science undergraduate at Purdue University from August 2023 to ",
    "GPA is 3.6/4.0",
    "Awards: Dean’s List & Semester Honors in 2023 and 2024",
    "Relevant coursework: Object-Oriented Programming, Discrete Mathematics, Linear Algebra, Data Structures & Algorithms, Computer Architecture, Systems Programming",
    "Working as a teaching assistant for Computer Science course at Purdue University (Helping more than 400 students and holding 2 lab sessions each semester)",
    "Worked as a researcher assistant for VIPER Lab at Purdue University from ",
    "Worked as a software engineer intern at Hyperlogy from May to July 2024 in Hanoi",
    "Worked as a data science researcher at Caterpillar.Inc from August 2023 to May 2024 in West Lafayette",
    "Built RAG chatbot using OpenAI's text embedding, integrated with Node.js, Express.js, JavaScript, HTML/CSS, Pinecone, Prisma, MongoDB",
    "Built a fullstack web app for emotional support: journaling, mood tracking, reflection, music suggestion with Spotify API",
    "Programming languages: Java, Python, C/C++, JavaScript, TypeScript, HTML/CSS, SQL, R",
    "Frameworks and libraries:  React, Node.js, Express.js, Next.js, REST API, Flask, Firebase, OpenCV, GraphQL",
    "Tools: Git, Github, IntelliJ, VS Code, Jupyter Notebook, Android Studio, Linux, AWS, MongoDB, Docker, Azure",
];

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

async function embedAndUpsert() {
    // 1. Create vector embeddings
    const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: resumeChunks,
    });

    const vectors = response.data.map((item, i) => ({
        id: `chunk-${i}`,
        values: item.embedding,
        metadata: { text: resumeChunks[i] },
    }));

    // 2. Connect to Pinecone index
    const index = pinecone.index(process.env.PINECONE_INDEX!);

    // 3. Upload to Pinecone
    await index.upsert(vectors);

    console.log("✅ Resume chunks embedded and uploaded to Pinecone.");
}

embedAndUpsert().catch(console.error);
