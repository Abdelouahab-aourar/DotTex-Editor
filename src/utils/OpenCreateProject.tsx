"use client"
import { open } from '@tauri-apps/plugin-dialog';
import { readDir, create } from "@tauri-apps/plugin-fs";
import { basename, join } from "@tauri-apps/api/path";
import { message } from '@tauri-apps/plugin-dialog';
import { invoke } from '@tauri-apps/api/core';
interface OpenProjectResult {
  fileTree: DirectorySchema[];
  mainFilePath: string;
  mainFileName: string;
}
export const OpenProject = async (): Promise<OpenProjectResult | null> => {
  const selectedPath = await open({
    multiple: false,
    directory: true,
  });
  if (!selectedPath) {
    await message('No Folder Selected', { title: 'DotTex', kind: 'info' });
    return null;
  }
  const entries = await readDir(selectedPath);
  const texFiles = entries.filter(entry =>
    entry.name?.toLowerCase().endsWith(".tex")
  );
  if (texFiles.length === 0) {
    await message('Folder must contain one .tex file', { title: 'DotTex', kind: 'error' });
    return null;
  }
  if (texFiles.length > 1) {
    await message('Folder must contain only one .tex file', { title: 'DotTex', kind: 'error' });
    return null;
  }
  const fileTree = await readFolderAsTree(selectedPath);
  const fileName = texFiles[0].name || "";
  const filePath = await join(selectedPath, fileName) || "";
  await invoke("add_to_history", { path: selectedPath })
  return { fileTree, mainFilePath: filePath, mainFileName: fileName };
}

export const OpenProjectOnStartup = async (): Promise<OpenProjectResult | null> => {
  const paths: string[] = await invoke("get_history");
  for (const path of paths) {
    try {
      const entries = await readDir(path);
      const texFiles = entries.filter(entry =>
        entry.name?.toLowerCase().endsWith(".tex")
      );
      if (texFiles.length !== 1) {
        continue;
      }
      const fileTree = await readFolderAsTree(path);
      const fileName = texFiles[0].name || "";
      const filePath = await join(path, fileName) || "";

      return { fileTree, mainFilePath: filePath, mainFileName: fileName };
    }
    catch (_) {
      continue;
    }
  }
  return null;
};

export const CreateProject = async (): Promise<OpenProjectResult | null> => {
  const selectedPath = await open({
    multiple: false,
    directory: true,
  });
  if (!selectedPath) {
    await message('No Folder Selected', { title: 'DotTex', kind: 'info' });
    return null;
  }
  const entries = await readDir(selectedPath);
  const texFiles = entries.filter(entry =>
    entry.name?.toLowerCase().endsWith(".tex")
  );
  if (texFiles.length > 0) {
    await message('Project already initialized you can open it using Open Project', {
      title: 'DotTex',
      kind: 'error'
    });
    return null;
  }
  const filePath = await join(selectedPath, 'main.tex');
  await create(filePath);
  await invoke("add_to_history", { path: selectedPath })
  const fileTree = await readFolderAsTree(selectedPath);
  return { fileTree, mainFilePath: filePath, mainFileName: "main.tex" };
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