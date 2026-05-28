import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      <Navbar />

      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-32">

        <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full top-10"></div>

        <p className="border border-zinc-700 px-4 py-2 rounded-full text-sm text-gray-300 backdrop-blur-md">
          AI-Powered Enterprise Knowledge Platform
        </p>

        <h1 className="text-7xl font-bold max-w-5xl mt-8 leading-tight">
          Securely Chat With Your Documents Using AI
        </h1>

        <p className="text-gray-400 text-xl max-w-2xl mt-8 leading-relaxed">
          Upload PDFs, policies, reports, and enterprise documents.
          Use AI semantic search and RAG pipelines to instantly retrieve insights.
        </p>

        <div className="flex gap-4 mt-10">

          <button className="px-8 py-4 bg-white text-black rounded-2xl font-semibold hover:bg-gray-200 transition">
            Get Started
          </button>

          <button className="px-8 py-4 border border-zinc-700 rounded-2xl hover:bg-zinc-900 transition">
            Live Demo
          </button>

        </div>

        <div className="grid grid-cols-3 gap-6 mt-28 max-w-6xl w-full">

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 backdrop-blur-md">
            <h2 className="text-2xl font-semibold">
              AI Retrieval
            </h2>

            <p className="text-gray-400 mt-4">
              Semantic document search powered by embeddings and vector databases.
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
            <h2 className="text-2xl font-semibold">
              Enterprise Security
            </h2>

            <p className="text-gray-400 mt-4">
              JWT authentication, secure APIs, and role-based document access.
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
            <h2 className="text-2xl font-semibold">
              RAG Architecture
            </h2>

            <p className="text-gray-400 mt-4">
              Retrieval-Augmented Generation pipelines for intelligent AI responses.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}