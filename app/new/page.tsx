import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import NewLinkForm from "@/components/NewLinkForm";
import { folders } from "@/components/data";

export default function NewLinkPage() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <Header />
      <div className="flex flex-1">
        <Sidebar folders={folders} />
        <main className="flex flex-1 justify-center p-6">
          <NewLinkForm folders={folders} />
        </main>
      </div>
    </div>
  );
}
