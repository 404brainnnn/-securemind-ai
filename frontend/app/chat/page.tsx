"use client";

import { useState } from "react";
import axios from "axios";

type Message = {
  type: "user" | "ai";
  text: string;
  time: string;
};

export default function ChatPage() {

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  function getTime() {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  async function uploadPDF(file: File) {

    const formData = new FormData();

    formData.append("file", file);

    setUploading(true);

    try {

      await axios.post(
        "http://127.0.0.1:8000/upload-pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const uploadMessage: Message = {
        type: "ai",
        text: "PDF uploaded successfully.",
        time: getTime(),
      };

      setMessages((prev) => [...prev, uploadMessage]);

    } catch (error) {

      const errorMessage: Message = {
        type: "ai",
        text: "PDF upload failed.",
        time: getTime(),
      };

      setMessages((prev) => [...prev, errorMessage]);

    }

    setUploading(false);
  }

  async function sendMessage() {

    if (!question.trim()) return;

    const userMessage: Message = {
      type: "user",
      text: question,
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/chat",
        {
          question: question,
        }
      );

      const aiMessage: Message = {
        type: "ai",
        text: response.data.answer,
        time: getTime(),
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {

      const errorMessage: Message = {
        type: "ai",
        text: "Error connecting to AI backend.",
        time: getTime(),
      };

      setMessages((prev) => [...prev, errorMessage]);

    }

    setQuestion("");
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white flex">

      {/* Sidebar */}

      <aside className="w-72 border-r border-zinc-800 bg-zinc-950 p-6 hidden md:flex flex-col">

        <h1 className="text-3xl font-bold tracking-tight">
          SecureMind AI
        </h1>

        <p className="text-gray-500 mt-2 text-sm">
          Enterprise AI Knowledge Platform
        </p>

        <button className="w-full mt-8 bg-white text-black py-3 rounded-2xl font-semibold hover:bg-gray-200 transition-all">
          + New Chat
        </button>

        {/* Upload */}

        <label className="block mt-5">

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition text-white text-center py-3 rounded-2xl cursor-pointer font-semibold shadow-lg">

            {uploading ? "Uploading..." : "Upload PDF"}

          </div>

          <input
            type="file"
            accept=".pdf"
            hidden
            onChange={(e) => {
              if (e.target.files?.[0]) {
                uploadPDF(e.target.files[0]);
              }
            }}
          />

        </label>

        {/* Sidebar History */}

        <div className="mt-10 space-y-4">

          <div className="bg-zinc-900 hover:bg-zinc-800 transition p-4 rounded-2xl cursor-pointer border border-zinc-800">
            Enterprise Policies
          </div>

          <div className="bg-zinc-900 hover:bg-zinc-800 transition p-4 rounded-2xl cursor-pointer border border-zinc-800">
            Financial Reports
          </div>

          <div className="bg-zinc-900 hover:bg-zinc-800 transition p-4 rounded-2xl cursor-pointer border border-zinc-800">
            AI Research Docs
          </div>

        </div>

      </aside>

      {/* Main Chat */}

      <section className="flex-1 flex flex-col relative overflow-hidden">

        {/* Glow Background */}

        <div className="absolute w-[500px] h-[500px] bg-purple-500/10 blur-[140px] rounded-full top-0 left-1/3"></div>

        {/* Chat Area */}

        <div className="flex-1 overflow-y-auto p-10 scroll-smooth relative z-10">

          <div className="max-w-4xl mx-auto flex flex-col gap-6">

            {messages.length === 0 && (

              <div className="text-center mt-32">

                <h1 className="text-6xl font-bold mb-6 tracking-tight">
                  SecureMind AI
                </h1>

                <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                  Upload enterprise documents and chat with them using AI-powered semantic search and RAG pipelines.
                </p>

              </div>

            )}

            {messages.map((msg, index) => (

              <div
                key={index}
                className={
                  msg.type === "user"
                    ? "bg-zinc-800 border border-zinc-700 p-5 rounded-3xl self-end max-w-2xl shadow-xl"
                    : "bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-purple-500/20 p-6 rounded-3xl max-w-3xl shadow-2xl"
                }
              >

                <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                  {msg.text}
                </p>

                <p className="text-xs text-gray-500 mt-4">
                  {msg.time}
                </p>

              </div>

            ))}

            {loading && (

              <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-3xl animate-pulse w-fit shadow-lg">

                Thinking...

              </div>

            )}

          </div>

        </div>

        {/* Input Area */}

        <div className="border-t border-zinc-800 p-6 bg-black/80 backdrop-blur-xl relative z-10">

          <div className="max-w-4xl mx-auto flex gap-4">

            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="Ask SecureMind AI..."
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 outline-none focus:border-purple-500 transition-all"
            />

            <button
              onClick={sendMessage}
              className="bg-white text-black px-8 rounded-2xl font-semibold hover:bg-gray-200 transition-all shadow-lg"
            >
              Send
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}