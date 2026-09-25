"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useFolders } from "./FoldersProvider";
import ConfirmDeleteFolderModal from "./ConfirmDeleteFolderModal";
import EditFolderModal from "./EditFolderModal";
import type { Folder } from "./types";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { folders, removeFolder, renameFolder } = useFolders();
  const [pendingDelete, setPendingDelete] = useState<Folder | null>(null);
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null);

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;
    const deletedHref = `/folder/${pendingDelete.id}`;
    await removeFolder(pendingDelete.id);
    setPendingDelete(null);
    if (pathname === deletedHref) {
      router.push("/");
    }
  };

  const handleConfirmEdit = async (name: string) => {
    if (!editingFolder) return;
    await renameFolder(editingFolder.id, name);
    setEditingFolder(null);
  };

  return (
    <aside className="flex w-56 flex-col gap-1 border-r border-[var(--border)] p-4">
      <Link
        href="/"
        className={`rounded-md px-3 py-2 text-left text-sm transition-colors duration-150 ${
          pathname === "/"
            ? "bg-[var(--hover-bg)] font-semibold text-[var(--text)]"
            : "font-medium text-[var(--text-sub)] hover:bg-[var(--hover-bg)]"
        }`}
      >
        ALL
      </Link>
      <div className="mt-4 flex flex-col gap-1">
        <span className="px-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-sub)]">
          폴더
        </span>
        {folders.map((folder) => {
          const href = `/folder/${folder.id}`;
          const isActive = pathname === href;
          return (
            <div
              key={folder.id}
              className={`group flex items-center rounded-md transition-colors duration-150 ${
                isActive ? "bg-[var(--hover-bg)]" : "hover:bg-[var(--hover-bg)]"
              }`}
            >
              <Link
                href={href}
                className={`flex-1 truncate px-3 py-2 text-left text-sm ${
                  isActive
                    ? "font-semibold text-[var(--text)]"
                    : "font-medium text-[var(--text-sub)]"
                }`}
              >
                {folder.name}
              </Link>
              <button
                type="button"
                onClick={() => setEditingFolder(folder)}
                aria-label={`${folder.name} 폴더 이름 수정`}
                className="rounded p-1 text-[var(--text-sub)] opacity-0 transition-opacity duration-150 hover:text-[var(--accent)] group-hover:opacity-100"
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
                onClick={() => setPendingDelete(folder)}
                aria-label={`${folder.name} 폴더 삭제`}
                className="mr-1 rounded p-1 text-[var(--text-sub)] opacity-0 transition-opacity duration-150 hover:text-[var(--error)] group-hover:opacity-100"
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
          );
        })}
      </div>
      <ConfirmDeleteFolderModal
        folderName={pendingDelete?.name ?? null}
        onCancel={() => setPendingDelete(null)}
        onConfirm={handleConfirmDelete}
      />
      <EditFolderModal
        key={editingFolder?.id ?? "none"}
        folderName={editingFolder?.name ?? null}
        onCancel={() => setEditingFolder(null)}
        onConfirm={handleConfirmEdit}
      />
    </aside>
  );
}
