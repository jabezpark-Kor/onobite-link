"use client";

import { useEffect, useState } from "react";

type EditFolderModalProps = {
  folderName: string | null;
  onCancel: () => void;
  onConfirm: (name: string) => void;
};

export default function EditFolderModal({
  folderName,
  onCancel,
  onConfirm,
}: EditFolderModalProps) {
  const [name, setName] = useState(folderName ?? "");

  useEffect(() => {
    setName(folderName ?? "");
  }, [folderName]);

  if (folderName === null) return null;

  const handleSave = () => {
    if (!name.trim()) return;
    onConfirm(name.trim());
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-6">
        <h2 className="text-base font-semibold text-[var(--text)]">
          폴더 이름 수정
        </h2>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="edit-folder-name"
            className="text-sm font-medium text-[var(--text-sub)]"
          >
            폴더 이름
          </label>
          <input
            id="edit-folder-name"
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
