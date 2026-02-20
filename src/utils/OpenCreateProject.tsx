"use client"
import { open } from '@tauri-apps/plugin-dialog';
import { readDir, create } from "@tauri-apps/plugin-fs";
import { basename, join } from "@tauri-apps/api/path";
import { message } from '@tauri-apps/plugin-dialog';
export const OpenProject = async (): Promise<DirectorySchema[]> => {
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

export const CreateProject = async (): Promise<DirectorySchema[]> => {
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
  if (texFiles.length > 0) {
    await message('Project already initialized you can open it using Open Project', {
      title: 'tex-ide',
      kind: 'error'
    });
    return [];
  }
  const mainFilePath = await join(selectedPath, 'main.tex');
  await create(mainFilePath);
  const result = await readFolderAsTree(selectedPath);
  return result;
}
export interface DirectorySchema {
  name: string;
  path: string;
  items?: DirectorySchema[];
}

const IGNORE_LIST = new Set(['node_modules']);

export async function readFolderAsTree(folderPath: string): Promise<DirectorySchema[]> {
  const entries = await readDir(folderPath);

  const visibleEntries = entries.filter(
    entry =>
      !entry.name.startsWith('.') &&
      !IGNORE_LIST.has(entry.name)
  );

  const items = await Promise.all(
    visibleEntries.map(async (entry): Promise<DirectorySchema> => {
      const newPath = await join(folderPath, entry.name);

      if (entry.isDirectory) {
        const subItems = await readFolderAsTree(newPath);

        return {
          name: entry.name,
          path: newPath,
          items: subItems[0].items
        };
      }

      return {
        name: entry.name,
        path: newPath
      };
    })
  );

  return [
    {
      name: await basename(folderPath),
      path: folderPath,
      items
    }
  ];
}