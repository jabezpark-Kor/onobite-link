"use client";

import LinkCard from "./LinkCard";
import { useBookmarks } from "./BookmarksProvider";
import { useFolders } from "./FoldersProvider";

type LinkGridProps = {
  folderId?: string;
};

export default function LinkGrid({ folderId }: LinkGridProps) {
  const { bookmarks } = useBookmarks();
  const { folders } = useFolders();

  const visibleBookmarks = folderId
    ? bookmarks.filter((bookmark) => bookmark.folderId === folderId)
    : bookmarks;

  const folderName = (id: string) =>
    folders.find((folder) => folder.id === id)?.name ?? "";

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {visibleBookmarks.map((bookmark) => (
        <LinkCard
          key={bookmark.id}
          bookmark={bookmark}
          folderName={folderName(bookmark.folderId)}
        />
      ))}
    </div>
  );
}
