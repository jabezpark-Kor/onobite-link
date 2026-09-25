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
          className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
        >
          링크 주소
        </label>
        <input
          id="link-url"
          type="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          className="rounded-lg border border-black/[.08] px-3 py-2 text-sm text-black outline-none focus:border-foreground dark:border-white/[.145] dark:bg-black dark:text-zinc-50"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="link-folder"
          className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
        >
          폴더
        </label>
        <select
          id="link-folder"
          value={folderId}
          onChange={(event) => setFolderId(event.target.value)}
          className="rounded-lg border border-black/[.08] px-3 py-2 text-sm text-black outline-none focus:border-foreground dark:border-white/[.145] dark:bg-black dark:text-zinc-50"
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
        className="mt-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
      >
        저장
      </button>
    </div>
  );
}
