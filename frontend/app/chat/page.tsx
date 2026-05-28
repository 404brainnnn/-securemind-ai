"use client";

import { useState } from "react";

export default function ChatPage() {

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<
    { role: string; content: string }[]
  >([]);

  const [loading, setLoading] = useState(false);

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
        content: data.answer || "No response",
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

    setLoading(false);
    setQuestion("");

  };

  return (
    <main className="min-h-screen bg-black text-white flex">

      {/* Sidebar */}

      <aside className="w-72 border-r border-zinc-800 bg-black p-6">

        <h1 className="text-4xl font-bold">
          SecureMind AI
        </h1>

        <p className="text-zinc-500 mt-2">
          Enterprise AI Knowledge Platform
        </p>

        <button className="w-full mt-10 bg-white text-black py-4 rounded-2xl font-semibold text-lg">
          + New Chat
        </button>

        <button className="w-full mt-5 bg-gradient-to-r from-purple-600 to-blue-600 py-4 rounded-2xl font-semibold text-lg">
          Upload PDF
        </button>

      </aside>

      {/* Chat Area */}

      <section className="flex-1 flex flex-col">

        {/* Messages */}

        <div className="flex-1 overflow-y-auto p-10">

          <div className="max-w-5xl mx-auto">

            {messages.length === 0 && (

              <div className="h-[70vh] flex flex-col items-center justify-center text-center">

                <h1 className="text-7xl font-bold">
                  SecureMind AI
                </h1>

                <p className="text-zinc-400 text-2xl mt-8 max-w-3xl">
                  Upload enterprise documents and chat with them
                  using AI-powered semantic search and RAG pipelines.
                </p>

              </div>

            )}

            <div className="space-y-6">

              {messages.map((message, index) => (

                <div
                  key={index}
                  className={`p-6 rounded-3xl max-w-4xl ${
                    message.role === "user"
                      ? "bg-white text-black ml-auto"
                      : "bg-zinc-900 border border-zinc-800"
                  }`}
                >

                  <p className="leading-relaxed text-lg">
                    {message.content}
                  </p>

                </div>

              ))}

              {loading && (

                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl max-w-4xl">

                  <p className="animate-pulse text-zinc-400">
                    SecureMind AI is thinking...
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

        {/* Input */}

        <div className="border-t border-zinc-900 p-8">

          <div className="max-w-5xl mx-auto flex gap-5">

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
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-3xl px-8 py-5 text-lg outline-none"
            />

            <button
              onClick={askQuestion}
              className="bg-white text-black px-10 rounded-3xl font-bold text-lg"
            >
              Send
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}