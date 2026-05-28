"use client";

import { useState } from "react";

export default function ChatPage() {

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [messages, setMessages] = useState<
    { role: string; content: string }[]
  >([]);

  const askQuestion = async () => {

    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: question,
          }),
        }
      );

      const data = await response.json();

      const aiMessage = {
        role: "assistant",
        content: data.answer,
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Backend connection failed.",
        },
      ]);

    }

    setQuestion("");
    setLoading(false);

  };

  const uploadPDF = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    setUploading(true);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/upload-pdf",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `PDF uploaded successfully. ${data.message}`,
        },
      ]);

    } catch (error) {

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "PDF upload failed.",
        },
      ]);

    }

    setUploading(false);

  };

  return (

    <main className="min-h-screen bg-black text-white flex">

      {/* Sidebar */}

      <aside className="w-80 border-r border-zinc-800 bg-black p-6 flex flex-col">

        <h1 className="text-5xl font-bold leading-tight">
          SecureMind AI
        </h1>

        <p className="text-zinc-500 mt-4 text-xl">
          Enterprise AI Knowledge Platform
        </p>

        <button className="w-full mt-12 bg-white text-black py-5 rounded-3xl font-bold text-2xl hover:bg-zinc-200 transition">
          + New Chat
        </button>

        <label className="w-full mt-5 bg-gradient-to-r from-purple-600 to-blue-600 py-5 rounded-3xl font-bold text-2xl flex items-center justify-center cursor-pointer hover:opacity-90 transition">

          {uploading ? "Uploading..." : "Upload PDF"}

          <input
            type="file"
            accept=".pdf"
            hidden
            onChange={uploadPDF}
          />

        </label>

        <div className="mt-10 flex flex-col gap-5">

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl hover:bg-zinc-800 transition cursor-pointer">
            <p className="text-2xl">
              Enterprise Policies
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl hover:bg-zinc-800 transition cursor-pointer">
            <p className="text-2xl">
              Financial Reports
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl hover:bg-zinc-800 transition cursor-pointer">
            <p className="text-2xl">
              AI Research Docs
            </p>
          </div>

        </div>

      </aside>

      {/* Chat Area */}

      <section className="flex-1 flex flex-col relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>

        {/* Messages */}

        <div className="flex-1 overflow-y-auto p-16 relative z-10">

          <div className="max-w-5xl mx-auto">

            {messages.length === 0 ? (

              <div className="h-full flex flex-col items-center justify-center text-center mt-32">

                <h1 className="text-8xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                  SecureMind AI
                </h1>

                <p className="text-zinc-400 text-3xl mt-8 max-w-3xl leading-relaxed">
                  Upload enterprise documents and chat with them using AI-powered semantic search and RAG pipelines.
                </p>

              </div>

            ) : (

              <div className="space-y-8">

                {messages.map((msg, index) => (

                  <div
                    key={index}
                    className={`p-8 rounded-3xl text-xl leading-relaxed ${
                      msg.role === "user"
                        ? "bg-white text-black ml-32"
                        : "bg-zinc-900 border border-zinc-800 mr-32"
                    }`}
                  >

                    {msg.content}

                  </div>

                ))}

                {loading && (

                  <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl mr-32 text-xl">
                    Thinking...
                  </div>

                )}

              </div>

            )}

          </div>

        </div>

        {/* Input */}

        <div className="border-t border-zinc-800 bg-black/60 backdrop-blur-xl p-8 relative z-10">

          <div className="max-w-5xl mx-auto flex gap-6">

            <input
              type="text"
              placeholder="Ask SecureMind AI..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  askQuestion();
                }
              }}
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-3xl px-8 py-6 outline-none text-2xl"
            />

            <button
              onClick={askQuestion}
              className="bg-white text-black px-12 rounded-3xl font-bold text-2xl hover:bg-zinc-200 transition"
            >

              Send

            </button>

          </div>

        </div>

      </section>

    </main>

  );

}