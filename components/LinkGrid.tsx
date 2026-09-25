import type { Bookmark, Folder } from "./types";
import LinkCard from "./LinkCard";

type LinkGridProps = {
  bookmarks: Bookmark[];
  folders: Folder[];
};

export default function LinkGrid({ bookmarks, folders }: LinkGridProps) {
  const folderName = (folderId: string) =>
    folders.find((folder) => folder.id === folderId)?.name ?? "";

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {bookmarks.map((bookmark) => (
        <LinkCard
          key={bookmark.id}
          bookmark={bookmark}
          folderName={folderName(bookmark.folderId)}
        />
      ))}
    </div>
  );
}
