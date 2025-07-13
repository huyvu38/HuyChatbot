import {Pinecone} from "@pinecone-database/pinecone";
import * as dotenv from "dotenv";

dotenv.config();
const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
});
const index = pinecone.index('quickstart');
export { pinecone };