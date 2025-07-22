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
```bash
huy_chatbot/
├── backend/                  # Backend server built with Node.js & TypeScript
│   ├── node_modules/         # Backend dependencies
│   ├── src/                  # Source files
│   │   ├── index.ts          # Entry point for the backend server
│   │   └── lib/              # Core logic for embeddings & RAG
│   │       ├── embed.ts      # Embeds resume chunks into Pinecone
│   │       ├── pinecone.ts   # Pinecone initialization
│   │       └── rag.ts        # RAG logic using OpenAI + Pinecone
│   └── .env                  # Environment variables for backend
│
├── frontend/                 # Frontend app built with React
│   ├── node_modules/         # Frontend dependencies
│   ├── public/               # Public assets
│   ├── src/                  # Frontend source files
│   │   ├── assets/           # Images and static files
│   │   │   ├── resume.pdf
│   │   │   ├── robot.png
│   │   │   ├── send.png
│   │   │   └── user.png
│   │   ├── pages/            # Page components
│   │   │   └── Chatbot.jsx   # Chat interface
│   │   ├── styles/           # CSS styles
│   │   │   └── styles.css
│   │   ├── App.jsx           # Main App component
│   │   └── main.jsx          # Entry point for React
│
├── prisma/                   # Prisma ORM config
│   └── schema.prisma         # Prisma schema file
```

