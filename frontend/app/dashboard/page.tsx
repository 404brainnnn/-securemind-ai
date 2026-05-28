import Sidebar from "../../components/Sidebar";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-black text-white flex">

      <Sidebar />

      <section className="flex-1 p-10">

        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Welcome back, Khushi 👋
        </p>

      </section>

    </main>
  );
}