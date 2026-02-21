import { readFolderAsTree } from '@/utils/OpenCreateProject';
import { create } from 'zustand';

interface FileItem {
  name: string;
  path: string;
  items?: FileItem[];
}

interface FileState {

  isProjectOpen: boolean;
  folderTree: FileItem[];
  mainFile: String;
  setMainFile: (file: String) => void;
  setProjectOpen: (isOpen: boolean) => void;
  setFolderTree: (tree: FileItem[]) => void;
  refreshTree: () => void;
}

export const useFileStore = create<FileState>((set, get) => ({
  mainFile: "",
  isProjectOpen: false,
  folderTree: [],
  setMainFile: (file) => set({ mainFile: file }),
  setProjectOpen: (isOpen) => set({ isProjectOpen: isOpen }),
  setFolderTree: (tree) => {
    const sortedTree = sortTree(tree);
    set({ folderTree: sortedTree });
  },
  refreshTree: async () => {
    const updatedTree = await readFolderAsTree(get().folderTree[0].path);
    get().setFolderTree(updatedTree);
  }

}));

const sortTree = (nodes: FileItem[]): FileItem[] => {
  return nodes
    .map((node) => {
      if (node.items) {
        return {
          ...node,
          items: sortTree(node.items),
        };
      }

      return node;
    })
    .sort((a, b) => {
      const aIsFolder = Array.isArray(a.items);
      const bIsFolder = Array.isArray(b.items);

      if (aIsFolder && !bIsFolder) return -1;
      if (!aIsFolder && bIsFolder) return 1;

      return a.name.localeCompare(b.name);
    });
};