"use client";

import { useState } from "react";
import type { Bookmark } from "./types";
import { useFolders } from "./FoldersProvider";

type EditLinkModalProps = {
  bookmark: Bookmark | null;
  onCancel: () => void;
  onConfirm: (updates: {
    folderId: string;
    title: string;
    description: string;
  }) => void;
};

export default function EditLinkModal({
  bookmark,
  onCancel,
  onConfirm,
}: EditLinkModalProps) {
  const { folders } = useFolders();
  const [folderId, setFolderId] = useState(bookmark?.folderId ?? "");
  const [title, setTitle] = useState(bookmark?.title ?? "");
  const [description, setDescription] = useState(bookmark?.description ?? "");

  if (!bookmark) return null;

  const handleSave = () => {
    if (!title.trim()) return;
    onConfirm({ folderId, title: title.trim(), description: description.trim() });
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-6">
        <h2 className="text-base font-semibold text-[var(--text)]">
          링크 정보 수정
        </h2>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="edit-link-folder"
            className="text-sm font-medium text-[var(--text-sub)]"
          >
            폴더
          </label>
          <select
            id="edit-link-folder"
            value={folderId}
            onChange={(event) => setFolderId(event.target.value)}
            className="rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-base text-[var(--text)] outline-none transition-colors duration-150 focus:border-[var(--accent)]"
          >
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="edit-link-title"
            className="text-sm font-medium text-[var(--text-sub)]"
          >
            제목
          </label>
          <input
            id="edit-link-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            autoFocus
            className="rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-base text-[var(--text)] outline-none transition-colors duration-150 focus:border-[var(--accent)]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="edit-link-description"
            className="text-sm font-medium text-[var(--text-sub)]"
          >
            설명
          </label>
          <textarea
            id="edit-link-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={3}
            className="resize-none rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-base text-[var(--text)] outline-none transition-colors duration-150 focus:border-[var(--accent)]"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)] transition-colors duration-150 hover:bg-[var(--hover-bg)]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-[var(--accent-hover)]"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
