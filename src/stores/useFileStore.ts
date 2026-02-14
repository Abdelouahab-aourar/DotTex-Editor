import { create } from 'zustand';
interface FileItem {
  name: string;
  items?: FileItem[];
}
interface FileState {
  folderTree: FileItem[];
  setFolderTree: (tree: FileItem[]) => void;
}
export const useFileStore = create<FileState>((set) => ({
  folderTree: [],
  setFolderTree: (tree) => set({ folderTree: tree }),
}));
