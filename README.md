# 🧠 Huy Chatbot - AI-Powered Resume

A full-stack AI chatbot application that answers questions based on information in resume using **Retrieval-Augmented Generation (RAG)**.

---

## ✨ Features

- 🔍 Ask AI questions about resume (powered by OpenAI embeddings + Pinecone)
- 📚 Context-aware answers with RAG
- 💬 Chatbot-style front end interface
- 🌐 Deployed backend on **Render**
- 🎨 Deployed frontend on **Vercel**

---

## 🛠 Tech Stack

- **Frontend:** React, Vite, HTML/CSS, JavaScript (deployed on Vercel)
- **Backend:** Node.js, Express, TypeScript (deployed on Render)
- **AI:** OpenAI GPT-4 & text-embedding-3-small
- **Vector DB:** Pinecone
- **ORM:** Prisma
- **Env Mgmt:** dotenv

---

## 🚀 Deployment URLs

- **Frontend (Vercel):** https://huyv-chatbot.vercel.app/
- **Backend (Render):** https://huychatbot.onrender.com

---

## 🧪 Local Development

1.  **Clone the repository:**

```bash
git clone https://github.com/huyvu38/HuyChatbot

```

2.  **Backend setup:**
```bash
cd backend
npm install
- Creat .env in /backend:
OPENAI_API_KEY=your-openai-api-key
PINECONE_API_KEY=your-pinecone-api-key
PINECONE_INDEX=your-pinecone-index-name
PORT=your-port-number
- Start the server:
npm run dev
```

3.  **Frontend setup:**
```bash
cd ..
cd chatbot
npm install
- Start the server:
npm run dev
```

## Project Structure
huy_chatbot/
├── backend/
│   │  
│   │── node_modules/
│   │
│   ├── src/
│   │   ├── index.ts
│   │   ├── lib/
│   │   │   ├── embed.ts
│   │   │   ├── pinecone.ts
│   │   │   └── rag.ts
│   └── .env
├── frontend/
│   │
│   │── node_modules/
│   │
│   ├── src/
│   │   ├── assets
│   │   │   ├── resume.pdf
│   │   │   ├── robot.png
│   │   │   ├── send.png
│   │   │   └── user.png
│   │   ├── pages
│   │   │   └── Chatbot.jsx
│   │   ├── styles
│   │   │   └── styles.css
│   │   │
│   │   │── App.jsx
│   │   │
│   │   │── main.jsx
│   │   │
│   ├── public/
│   │
|── prisma/
|   └──  schema.prisma

