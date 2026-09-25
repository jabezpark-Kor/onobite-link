"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Folder } from "./types";
import { createClient } from "@/utils/supabase/client";

type FoldersContextValue = {
  folders: Folder[];
  addFolder: (name: string) => Promise<Folder | null>;
  removeFolder: (id: string) => Promise<void>;
  renameFolder: (id: string, name: string) => Promise<void>;
};

const FoldersContext = createContext<FoldersContextValue | null>(null);

export function FoldersProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const isAddingRef = useRef(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("folders")
      .select("id, name")
      .order("created_at", { ascending: true })
      .then(({ data, error }) => {
        if (error || !data) return;
        setFolders(data.map((row) => ({ id: String(row.id), name: row.name })));
      });
  }, []);

  const addFolder = async (name: string) => {
    const trimmed = name.trim();
    if (!trimmed || isAddingRef.current) return null;
    isAddingRef.current = true;
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("folders")
        .insert({ name: trimmed })
        .select("id, name")
        .single();
      if (error || !data) return null;
      const newFolder: Folder = { id: String(data.id), name: data.name };
      setFolders((prev) => [...prev, newFolder]);
      return newFolder;
    } finally {
      isAddingRef.current = false;
    }
  };

  const removeFolder = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("folders").delete().eq("id", id);
    if (error) return;
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  };

  const renameFolder = async (id: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const supabase = createClient();
    const { error } = await supabase
      .from("folders")
      .update({ name: trimmed })
      .eq("id", id);
    if (error) return;
    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === id ? { ...folder, name: trimmed } : folder,
      ),
    );
  };

  return (
    <FoldersContext.Provider
      value={{ folders, addFolder, removeFolder, renameFolder }}
    >
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
