import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      
      <Navbar />

      <section className="flex flex-col items-center justify-center text-center mt-32 px-6">
        
        <h2 className="text-6xl font-bold max-w-4xl leading-tight">
          Enterprise AI Knowledge Platform
        </h2>

        <p className="text-gray-400 text-xl mt-6 max-w-2xl">
          Securely upload, search, and chat with enterprise documents using AI-powered semantic retrieval.
        </p>

      </section>

    </main>
  );
}