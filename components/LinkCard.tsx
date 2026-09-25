import type { Bookmark } from "./types";

type LinkCardProps = {
  bookmark: Bookmark;
  folderName: string;
};

export default function LinkCard({ bookmark, folderName }: LinkCardProps) {
  let hostname = bookmark.url;
  try {
    hostname = new URL(bookmark.url).hostname;
  } catch {
    hostname = bookmark.url;
  }

  return (
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-3 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-4 transition-colors duration-150 hover:bg-[var(--hover-bg)]"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-semibold text-white">
          {bookmark.title.charAt(0)}
        </div>
        <span className="rounded px-2 py-0.5 text-[13px] font-medium text-[var(--text)] bg-[var(--hover-bg)]">
          {folderName}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="truncate text-sm font-semibold text-[var(--text)]">
          {bookmark.title}
        </h3>
        <p className="truncate text-xs text-[var(--text-sub)]">{hostname}</p>
      </div>
    </a>
  );
}
