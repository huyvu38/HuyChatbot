import {PineconeClient} from "@pinecone-database/pinecone";
import * as dotenv from "dotenv";

dotenv.config();

const pinecone = new PineconeClient();

await pinecone.init({
    apiKey: process.env.PINECONE_API_KEY!,
    environment: process.env.PINECONE_ENVIRONMENT!, // <-- only these two!
});

export { pinecone };
