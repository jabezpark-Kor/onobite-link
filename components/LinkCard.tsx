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
      className="flex flex-col gap-3 rounded-xl border border-black/[.08] p-4 transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
          {bookmark.title.charAt(0)}
        </div>
        <span className="rounded-full bg-black/[.06] px-2 py-1 text-xs font-medium text-zinc-600 dark:bg-white/[.08] dark:text-zinc-400">
          {folderName}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="truncate text-sm font-semibold text-black dark:text-zinc-50">
          {bookmark.title}
        </h3>
        <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
          {hostname}
        </p>
      </div>
    </a>
  );
}
