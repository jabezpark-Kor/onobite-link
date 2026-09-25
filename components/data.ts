import type { Bookmark, Folder } from "./types";

export const folders: Folder[] = [
  { id: "dev", name: "개발" },
  { id: "design", name: "디자인" },
  { id: "article", name: "아티클" },
  { id: "shopping", name: "쇼핑" },
];

export const bookmarks: Bookmark[] = [
  { id: "1", title: "Next.js Documentation", url: "https://nextjs.org/docs", folderId: "dev" },
  { id: "2", title: "Tailwind CSS", url: "https://tailwindcss.com", folderId: "dev" },
  { id: "3", title: "Dribbble", url: "https://dribbble.com", folderId: "design" },
  { id: "4", title: "Figma", url: "https://figma.com", folderId: "design" },
  { id: "5", title: "Medium", url: "https://medium.com", folderId: "article" },
  { id: "6", title: "요즘 IT", url: "https://yozm.wishket.com", folderId: "article" },
  { id: "7", title: "무신사", url: "https://musinsa.com", folderId: "shopping" },
  { id: "8", title: "쿠팡", url: "https://coupang.com", folderId: "shopping" },
];
