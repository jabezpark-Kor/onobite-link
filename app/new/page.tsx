import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import NewLinkForm from "@/components/NewLinkForm";

export default function NewLinkPage() {
  return (
    <div className="flex flex-1 flex-col bg-[var(--bg)]">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex flex-1 justify-center px-6 pt-10 pb-6">
          <NewLinkForm />
        </main>
      </div>
    </div>
  );
}
