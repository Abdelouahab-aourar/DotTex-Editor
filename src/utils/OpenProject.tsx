import { open } from '@tauri-apps/plugin-dialog';
import { readDir } from "@tauri-apps/plugin-fs";
import { join } from "@tauri-apps/api/path";

export interface FileNode {
  name: string;
  items?: FileNode[];
}

export const OpenFolder = async (): Promise<FileNode[] | null> => {
  const selectedPath = await open({
    multiple: false,
    directory: true,
  });

  if (!selectedPath || Array.isArray(selectedPath)) {
    return null;
  }

  console.log("Selected directory:", selectedPath);
  const result = await readFolderAsTree(selectedPath);
  
  console.log("Full Tree:", JSON.stringify(result, null, 2));
  return result;
}

async function readFolderAsTree(folderPath: string): Promise<FileNode[]> {
  try {
    const entries = await readDir(folderPath);

    return Promise.all(
      entries.map(async (entry): Promise<FileNode> => {
        const newPath = await join(folderPath, entry.name);

        if (entry.isDirectory) {
          const items = await readFolderAsTree(newPath);
          return { 
            name: entry.name, 
            items 
          };
        } 
        
        return { 
          name: entry.name 
        };
      })
    );
  } catch (err) {
    console.warn(`Could not read ${folderPath}:`, err);
    return [];
  }
}