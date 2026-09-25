export type Folder = {
  id: string;
  name: string;
};

export type Bookmark = {
  id: string;
  title: string;
  url: string;
  folderId: string;
  description?: string;
  thumbnailUrl?: string;
};
