"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Bookmark } from "./types";
import { createClient } from "@/utils/supabase/client";

type BookmarkEditableFields = Pick<Bookmark, "folderId" | "title" | "description">;

type BookmarksContextValue = {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, "id">) => Promise<Bookmark | null>;
  removeBookmark: (id: string) => void;
  updateBookmark: (id: string, updates: BookmarkEditableFields) => Promise<void>;
};

const BookmarksContext = createContext<BookmarksContextValue | null>(null);

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const isAddingRef = useRef(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("links")
      .select("id, url, title, description, thumbnail_url, folder_id")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error || !data) return;
        setBookmarks(
          data.map((row) => ({
            id: String(row.id),
            title: row.title ?? "",
            url: row.url,
            folderId: row.folder_id != null ? String(row.folder_id) : "",
            description: row.description ?? undefined,
            thumbnailUrl: row.thumbnail_url ?? undefined,
          })),
        );
      });
  }, []);

  const addBookmark = async (bookmark: Omit<Bookmark, "id">) => {
    if (isAddingRef.current) return null;
    isAddingRef.current = true;
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("links")
        .insert({
          url: bookmark.url,
          title: bookmark.title,
          description: bookmark.description ?? null,
          thumbnail_url: bookmark.thumbnailUrl ?? null,
          folder_id: Number(bookmark.folderId),
        })
        .select("id, url, title, description, thumbnail_url, folder_id")
        .single();
      if (error || !data) return null;
      const newBookmark: Bookmark = {
        id: String(data.id),
        title: data.title ?? "",
        url: data.url,
        folderId: data.folder_id != null ? String(data.folder_id) : "",
        description: data.description ?? undefined,
        thumbnailUrl: data.thumbnail_url ?? undefined,
      };
      setBookmarks((prev) => [newBookmark, ...prev]);
      return newBookmark;
    } finally {
      isAddingRef.current = false;
    }
  };

  const removeBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
  };

  const updateBookmark = async (id: string, updates: BookmarkEditableFields) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("links")
      .update({
        title: updates.title,
        description: updates.description || null,
        folder_id: Number(updates.folderId),
      })
      .eq("id", id);
    if (error) return;
    setBookmarks((prev) =>
      prev.map((bookmark) =>
        bookmark.id === id ? { ...bookmark, ...updates } : bookmark,
      ),
    );
  };

  return (
    <BookmarksContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark, updateBookmark }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarksProvider");
  }
  return context;
}
