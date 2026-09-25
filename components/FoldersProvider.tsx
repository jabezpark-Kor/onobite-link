"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Folder } from "./types";
import { folders as initialFolders } from "./data";

type FoldersContextValue = {
  folders: Folder[];
  addFolder: (name: string) => Folder;
  removeFolder: (id: string) => void;
};

const FoldersContext = createContext<FoldersContextValue | null>(null);

function createFolderId(name: string) {
  const slug = name.trim().toLowerCase().replace(/\s+/g, "-");
  return `${slug}-${Date.now().toString(36)}`;
}

export function FoldersProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  const addFolder = (name: string) => {
    const newFolder: Folder = { id: createFolderId(name), name: name.trim() };
    setFolders((prev) => [...prev, newFolder]);
    return newFolder;
  };

  const removeFolder = (id: string) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  };

  return (
    <FoldersContext.Provider value={{ folders, addFolder, removeFolder }}>
      {children}
    </FoldersContext.Provider>
  );
}

export function useFolders() {
  const context = useContext(FoldersContext);
  if (!context) {
    throw new Error("useFolders must be used within a FoldersProvider");
  }
  return context;
}
