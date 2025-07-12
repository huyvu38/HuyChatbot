import {Pinecone} from "@pinecone-database/pinecone"; // Import Pinecone, not PineconeClient
import * as dotenv from "dotenv";

dotenv.config();

// The new way to initialize the client
const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
});

export { pinecone };