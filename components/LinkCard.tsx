"use client";

import { useState } from "react";
import type { Bookmark } from "./types";
import { useBookmarks } from "./BookmarksProvider";
import ConfirmDeleteLinkModal from "./ConfirmDeleteLinkModal";
import EditLinkModal from "./EditLinkModal";

type LinkCardProps = {
  bookmark: Bookmark;
  folderName: string;
};

export default function LinkCard({ bookmark, folderName }: LinkCardProps) {
  const { removeBookmark, updateBookmark } = useBookmarks();
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  let hostname = bookmark.url;
  try {
    hostname = new URL(bookmark.url).hostname;
  } catch {
    hostname = bookmark.url;
  }

  return (
    <div className="group relative">
      <a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col gap-3 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-4 transition-colors duration-150 hover:bg-[var(--hover-bg)]"
      >
        {bookmark.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bookmark.thumbnailUrl}
            alt=""
            className="-mx-4 -mt-4 aspect-[1.91/1] w-[calc(100%+2rem)] object-cover"
          />
        ) : null}
        <div className="flex items-center justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-semibold text-white">
            {bookmark.title.charAt(0)}
          </div>
          <span className="rounded px-2 py-0.5 text-[13px] font-medium text-[var(--text)] bg-[var(--hover-bg)] transition-opacity duration-150 group-hover:opacity-0">
            {folderName}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="truncate text-sm font-semibold text-[var(--text)]">
            {bookmark.title}
          </h3>
          {bookmark.description ? (
            <p className="line-clamp-2 text-xs text-[var(--text-sub)]">
              {bookmark.description}
            </p>
          ) : null}
          <p className="truncate text-xs text-[var(--text-sub)]">
            {hostname}
          </p>
        </div>
      </a>
      <div className="absolute right-2 top-2 flex items-center gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          aria-label={`${bookmark.title} 링크 수정`}
          className="rounded p-1 text-[var(--text-sub)] hover:text-[var(--accent)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => setConfirmingDelete(true)}
          aria-label={`${bookmark.title} 링크 삭제`}
          className="rounded p-1 text-[var(--text-sub)] hover:text-[var(--error)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </div>
      <ConfirmDeleteLinkModal
        linkTitle={confirmingDelete ? bookmark.title : null}
        onCancel={() => setConfirmingDelete(false)}
        onConfirm={() => {
          removeBookmark(bookmark.id);
          setConfirmingDelete(false);
        }}
      />
      <EditLinkModal
        key={isEditing ? bookmark.id : "closed"}
        bookmark={isEditing ? bookmark : null}
        onCancel={() => setIsEditing(false)}
        onConfirm={(updates) => {
          updateBookmark(bookmark.id, updates);
          setIsEditing(false);
        }}
      />
    </div>
  );
}
