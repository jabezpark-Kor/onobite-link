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
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <Header />
      <div className="flex flex-1">
        <Sidebar folders={folders} />
        <main className="flex-1 p-6">
          <LinkGrid bookmarks={folderBookmarks} folders={folders} />
        </main>
      </div>
    </div>
  );
}
