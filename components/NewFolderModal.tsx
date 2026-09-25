"use client";

import { useState } from "react";
import { useFolders } from "./FoldersProvider";

type NewFolderModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function NewFolderModal({ open, onClose }: NewFolderModalProps) {
  const { addFolder } = useFolders();
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  if (!open) return null;

  const handleSave = async () => {
    if (!name.trim() || isSaving) return;
    setIsSaving(true);
    try {
      await addFolder(name);
      setName("");
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-6">
        <h2 className="text-base font-semibold text-[var(--text)]">
          새 폴더
        </h2>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="folder-name"
            className="text-sm font-medium text-[var(--text-sub)]"
          >
            폴더 이름
          </label>
          <input
            id="folder-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="폴더 이름을 입력하세요"
            autoFocus
            className="rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-base text-[var(--text)] outline-none transition-colors duration-150 placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSaving}
            className="rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)] transition-colors duration-150 hover:bg-[var(--hover-bg)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </div>
  );
}
