import { create } from 'zustand';
interface FileItem {
  name: string;
  items?: FileItem[];
}
interface FileState {
  isProjectOpen: boolean;
  folderTree: FileItem[];
  setProjectOpen: (isOpen: boolean) => void;
  setFolderTree: (tree: FileItem[]) => void;
}
export const useFileStore = create<FileState>((set) => ({
  isProjectOpen: false,
  folderTree: [],
  setProjectOpen: (isOpen) => set({ isProjectOpen: isOpen }),
  setFolderTree: (tree) => set({ folderTree: tree })
}));
