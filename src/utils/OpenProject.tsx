"use client"
import { open } from '@tauri-apps/plugin-dialog';
import { readDir } from "@tauri-apps/plugin-fs";
import { join } from "@tauri-apps/api/path";
import { message } from '@tauri-apps/plugin-dialog';
export const OpenFolder = async (): Promise<DirectorySchema[]> => {
  const selectedPath = await open({
    multiple: false,
    directory: true,
  });
  if (!selectedPath) {
    await message('No Folder Selected', { title: 'tex-ide', kind: 'info' });
    return [];
  }
  const entries = await readDir(selectedPath);
  const texFiles = entries.filter(entry =>
    entry.name?.toLowerCase().endsWith(".tex")
  );
  if (texFiles.length == 0) {
    await message('Folder must contain one .tex file', {
      title: 'tex-ide',
      kind: 'error'
    });
    return [];
  }
  else if (texFiles.length > 1) {
    await message('Folder must contain only one .tex file', {
      title: 'tex-ide',
      kind: 'error'
    });
    return [];
  }
  const result = await readFolderAsTree(selectedPath);
  return result;
}



export interface DirectorySchema {
  name: string;
  items?: DirectorySchema[];
}

async function readFolderAsTree(folderPath: string): Promise<DirectorySchema[]> {
  const entries = await readDir(folderPath);
  const visibleEntries = entries.filter(entry => !entry.name.startsWith('.'));
  return Promise.all(
    visibleEntries.map(async (entry): Promise<DirectorySchema> => {
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
}