"use client"
import { open } from '@tauri-apps/plugin-dialog';
import { readDir } from "@tauri-apps/plugin-fs";
import { join } from "@tauri-apps/api/path";

export const OpenFolder = async (): Promise<DirectorySchema[]> => {
  const selectedPath = await open({
    multiple: false,
    directory: true,
  });

  if (!selectedPath) {
    return [];
  }

  console.log("Selected directory:", selectedPath);
  await readFolderAsTree(selectedPath)
  const result = await readFolderAsTree(selectedPath);
  console.log(JSON.stringify(result, null, 2));
  return result;
}



export interface DirectorySchema {
  name: string;
  items?: DirectorySchema[];
}

async function readFolderAsTree(folderPath: string): Promise<DirectorySchema[]> {
  try {
    const entries = await readDir(folderPath);

    return Promise.all(
      entries.map(async (entry): Promise<DirectorySchema> => {
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