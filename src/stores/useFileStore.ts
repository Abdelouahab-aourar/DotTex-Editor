import { readFolderAsTree } from '@/utils/OpenCreateProject';
import { create } from 'zustand';
import { copyItem, moveItem } from '@/utils/FileTreeUtils';
import { basename } from '@tauri-apps/api/path';

interface FileItem {
  name: string;
  path: string;
  items?: FileItem[];
}

interface FileState {

  isProjectOpen: boolean;
  folderTree: FileItem[];
  mainFilePath: string;
  mainFileName: string;

  setMainFileName: (fileName: string) => void;
  setMainFilePath: (filePath: string) => void;
  setProjectOpen: (isOpen: boolean) => void;
  setFolderTree: (tree: FileItem[]) => void;
  refreshTree: () => void;

  sourcePath: string;
  destinationPath: string;
  action: "copy" | "move" | "none";

  setSourcePath: (sp: string) => void
  setDestinationPath: (dp: string) => void;
  setAction: (a: "copy" | "move" | "none") => void;

  doAction: () => void


}

export const useFileStore = create<FileState>((set, get) => ({
  mainFileName: "",
  mainFilePath: "",
  isProjectOpen: false,
  folderTree: [],
  setMainFileName: (fileName) => set({ mainFileName: fileName }),
  setMainFilePath: (filePath) => set({ mainFilePath: filePath }),
  setProjectOpen: (isOpen) => set({ isProjectOpen: isOpen }),
  setFolderTree: (tree) => {
    const sortedTree = sortTree(tree);
    set({ folderTree: sortedTree });
  },
  refreshTree: async () => {
    const updatedTree = await readFolderAsTree(get().folderTree[0].path);
    get().setFolderTree(updatedTree);
  },

  sourcePath: "",
  destinationPath: "",
  action: "none",

  setSourcePath: (sp: string) => set({ sourcePath: sp }),
  setDestinationPath: (dp: string) => set({ destinationPath: dp }),
  setAction: (a: "copy" | "move" | "none") => set({ action: a }),

  doAction: async () => {
    if (get().sourcePath.length === 0 || get().destinationPath.length === 0)
      return;

    if (get().action === "move")
      await moveItem(get().sourcePath, get().destinationPath, await basename(get().sourcePath))

    if (get().action === "copy")
      await copyItem(get().sourcePath, get().destinationPath, await basename(get().sourcePath))

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