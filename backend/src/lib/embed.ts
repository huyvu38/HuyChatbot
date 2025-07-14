import OpenAI from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const resumeChunks = [
    "Huy Vu is a Computer Science and Data Science undergraduate at " +
    "Purdue University from August 2023 to May 2027",
    "GPA is 3.6/4.0",
    "Awards: Dean’s List & Semester Honors in 2023 and 2024",
    "Relevant coursework: Object-Oriented Programming, Discrete Mathematics," +
    "Linear Algebra, Data Structures & Algorithms, Computer Architecture, Systems Programming",
    "Worked as a software engineer intern at Hyperlogy in 2024 in Hanoi",
    "Worked as a data science researcher at Caterpillar.Inc in West Lafayatte",
    "Working as a teaching assistant for Computer Science course at Purdue University " +
    "(Helping more than 400 students and holding 2 lab sessions each semester)",
    "Built RAG chatbot using OpenAI, integrated with Node.js, Express.js, JavaScript, HTML/CSS, OpenAI API",
    "Built a fullstack web application to provides emotional support through guided journaling, daily mood tracking, " +
    "self-reflection tools and music suggestion using Spotify API",
    "Skills include JavaScript, Python, HTML/CSS, SQL, C/C++",
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
