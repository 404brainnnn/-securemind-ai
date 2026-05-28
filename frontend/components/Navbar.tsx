export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-6 border-b border-gray-800">
      
      <h1 className="text-2xl font-bold">
        SecureMind AI
      </h1>

      <div className="flex gap-4">

        <button className="px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-900">
          Login
        </button>

        <button className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-200">
          Get Started
        </button>

      </div>
    </nav>
  );
}