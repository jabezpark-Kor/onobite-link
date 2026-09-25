import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import LinkGrid from "@/components/LinkGrid";
import { bookmarks, folders } from "@/components/data";

export default async function FolderPage(
  props: PageProps<"/folder/[folderId]">,
) {
  const { folderId } = await props.params;
  const folderBookmarks = bookmarks.filter(
    (bookmark) => bookmark.folderId === folderId,
  );

  return (
    <div className="flex flex-1 flex-col bg-[var(--bg)]">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 px-6 pt-10 pb-6">
          <LinkGrid bookmarks={folderBookmarks} folders={folders} />
        </main>
      </div>
    </div>
  );
}
