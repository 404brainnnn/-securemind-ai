export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-zinc-950 border-r border-zinc-800 p-6">
      
      <h1 className="text-2xl font-bold text-white">
        SecureMind AI
      </h1>

      <div className="mt-10 flex flex-col gap-4">

        <button className="text-left px-4 py-3 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800">
          Dashboard
        </button>

        <button className="text-left px-4 py-3 rounded-xl text-gray-400 hover:bg-zinc-900 hover:text-white">
          Upload Documents
        </button>

        <button className="text-left px-4 py-3 rounded-xl text-gray-400 hover:bg-zinc-900 hover:text-white">
          AI Chat
        </button>

        <button className="text-left px-4 py-3 rounded-xl text-gray-400 hover:bg-zinc-900 hover:text-white">
          Analytics
        </button>

        <button className="text-left px-4 py-3 rounded-xl text-gray-400 hover:bg-zinc-900 hover:text-white">
          Settings
        </button>

      </div>

    </aside>
  );
}