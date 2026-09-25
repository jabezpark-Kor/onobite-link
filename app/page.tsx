import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import LinkGrid from "@/components/LinkGrid";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-[var(--bg)]">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 px-6 pt-10 pb-6">
          <LinkGrid />
        </main>
      </div>
    </div>
  );
}
