# SecureMind AI 🚀

SecureMind AI is a full-stack AI-powered enterprise document assistant built using FastAPI, Next.js, LangChain, ChromaDB, and Groq LLM APIs.

It allows users to upload PDFs and chat with their documents using Retrieval-Augmented Generation (RAG).

---

# Features ✨

- AI-powered document chat
- PDF upload system
- Semantic search using embeddings
- Chroma vector database
- Groq LLM integration
- FastAPI backend
- Next.js frontend
- JWT-style authentication
- Protected routes
- Modern responsive UI
- RAG pipeline implementation

---

# Tech Stack 🛠️

## Frontend
- Next.js
- TypeScript
- TailwindCSS

## Backend
- FastAPI
- LangChain
- ChromaDB
- Groq API
- HuggingFace Embeddings

---

# Folder Structure 📂

```bash
securemind-ai/
│
├── backend/
│   ├── app/
│   ├── uploads/
│   ├── main.py
│
├── frontend/
│   ├── app/
│   ├── components/
│
└── README.md
```

---

# Installation ⚡

## 1. Clone Repository

```bash
git clone https://github.com/404brainnnn/-securemind-ai.git
```

---

# Backend Setup 🔥

## Go to backend

```bash
cd backend
```

## Create virtual environment

```bash
python -m venv venv
```

## Activate environment

### Mac/Linux

```bash
source venv/bin/activate
```

### Windows

```bash
venv\Scripts\activate
```

---

## Install dependencies

```bash
pip install -r requirements.txt
```

---

## Create `.env`

```env
GROQ_API_KEY=your_groq_api_key
```

---

## Run backend

```bash
uvicorn main:app --reload
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

---

# Frontend Setup 🎨

## Go to frontend

```bash
cd frontend
```

## Install dependencies

```bash
npm install
```

---

## Run frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# API Endpoints 📡

## Upload PDF

```http
POST /upload-pdf
```

---

## Chat with AI

```http
POST /chat
```

---

## Signup

```http
POST /signup
```

---

## Login

```http
POST /login
```

---

# RAG Pipeline 🧠

1. Upload PDF
2. Extract text
3. Split into chunks
4. Generate embeddings
5. Store vectors in ChromaDB
6. Retrieve relevant chunks
7. Send context to Groq LLM
8. Generate AI response

---

# Screenshots 📸

- Landing Page
- Chat Dashboard
- PDF Upload
- AI Responses
- Authentication Pages

(Add screenshots later)

---

# Future Improvements 🚀

- Multi-document support
- Streaming AI responses
- Chat history
- Drag & drop upload
- Cloud deployment
- User dashboards
- Database integration
- Advanced authentication

---

# Author 👨‍💻

Khushi Kumari

---

# License 📄

MIT License
