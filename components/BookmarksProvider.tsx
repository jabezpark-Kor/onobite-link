"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Bookmark } from "./types";
import { bookmarks as initialBookmarks } from "./data";

type BookmarkEditableFields = Pick<Bookmark, "folderId" | "title" | "description">;

type BookmarksContextValue = {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, "id">) => Bookmark;
  removeBookmark: (id: string) => void;
  updateBookmark: (id: string, updates: BookmarkEditableFields) => void;
};

const BookmarksContext = createContext<BookmarksContextValue | null>(null);

function createBookmarkId() {
  return `bm-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);

  const addBookmark = (bookmark: Omit<Bookmark, "id">) => {
    const newBookmark: Bookmark = { ...bookmark, id: createBookmarkId() };
    setBookmarks((prev) => [newBookmark, ...prev]);
    return newBookmark;
  };

  const removeBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
  };

  const updateBookmark = (id: string, updates: BookmarkEditableFields) => {
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
