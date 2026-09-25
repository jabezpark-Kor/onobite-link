"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFolders } from "./FoldersProvider";
import { useBookmarks } from "./BookmarksProvider";

type OgInfoResponse = {
  url: string;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  error?: string;
};

export default function NewLinkForm() {
  const router = useRouter();
  const { folders } = useFolders();
  const { addBookmark } = useBookmarks();
  const [url, setUrl] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const folderId = selectedFolderId || folders[0]?.id || "";

  const handleSave = async () => {
    if (!url.trim() || !folderId) return;

    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/og-info?url=${encodeURIComponent(url.trim())}`,
      );
      const data: OgInfoResponse = await response.json();

      if (!response.ok) {
        setError(data.error ?? "링크 정보를 가져오지 못했습니다.");
        return;
      }

      const saved = await addBookmark({
        title: data.title,
        url: data.url,
        folderId,
        description: data.description ?? undefined,
        thumbnailUrl: data.thumbnailUrl ?? undefined,
      });

      if (!saved) {
        setError("링크를 저장하지 못했습니다.");
        return;
      }

      router.push(`/folder/${folderId}`);
    } catch {
      setError("링크 정보를 가져오지 못했습니다.");
    } finally {
      setIsSaving(false);
    }
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
          disabled={isSaving}
          className="rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-base text-[var(--text)] outline-none transition-colors duration-150 placeholder:text-[var(--placeholder)] focus:border-[var(--accent)] disabled:opacity-60"
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
          onChange={(event) => setSelectedFolderId(event.target.value)}
          disabled={isSaving}
          className="rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-base text-[var(--text)] outline-none transition-colors duration-150 focus:border-[var(--accent)] disabled:opacity-60"
        >
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
      </div>
      {error ? (
        <p className="text-sm text-[var(--error)]">{error}</p>
      ) : null}
      <button
        type="button"
        onClick={handleSave}
        disabled={isSaving || !url.trim()}
        className="mt-2 rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSaving ? "저장 중..." : "저장"}
      </button>
    </div>
  );
}
