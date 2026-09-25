"use client";

import { useState } from "react";
import type { Folder } from "./types";

type NewLinkFormProps = {
  folders: Folder[];
};

export default function NewLinkForm({ folders }: NewLinkFormProps) {
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState(folders[0]?.id ?? "");

  const handleSave = () => {
    console.log({ url, folderId });
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="link-url"
          className="text-sm font-medium text-[var(--text-sub)]"
        >
          링크 주소
        </label>
        <input
          id="link-url"
          type="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          className="rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-base text-[var(--text)] outline-none transition-colors duration-150 placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="link-folder"
          className="text-sm font-medium text-[var(--text-sub)]"
        >
          폴더
        </label>
        <select
          id="link-folder"
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
      <button
        type="button"
        onClick={handleSave}
        className="mt-2 rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-[var(--accent-hover)]"
      >
        저장
      </button>
    </div>
  );
}
