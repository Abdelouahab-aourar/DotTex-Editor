import { mkdir, exists, copyFile, rename, readDir, stat, remove } from "@tauri-apps/plugin-fs";
import { dirname, join } from "@tauri-apps/api/path";
import { message } from "@tauri-apps/plugin-dialog"

export const createFolder = async (
  parentPath: string,
  folderName: string
) => {
  try {
    const newFolderPath = await join(parentPath, folderName);

    const alreadyExists = await exists(newFolderPath);
    if (alreadyExists) {
      throw new Error("Folder already exists");
    }

    await mkdir(newFolderPath);

    return newFolderPath;
  } catch (error) {
    await message("Failed to create folder: " + error, {
      title: 'DotTex',
      kind: 'error'
    });
    throw error;
  }
};

export const copyItem = async (
  sourcePath: string,
  destinationParentPath: string,
  name: string
) => {
  try {
    const destinationPath = await join(destinationParentPath, name);

    
    if (await exists(destinationPath)) {
      throw new Error("Destination already exists");
    }
    
    if (destinationPath.startsWith(sourcePath + "/") ||
      destinationPath.startsWith(sourcePath + "\\") ||
      destinationPath === sourcePath) {
      throw new Error("Cannot copy a folder into itself");
    }
    
    const info = await stat(sourcePath);

    if (info.isDirectory)
      await copyDirectoryRecursive(sourcePath, destinationPath);
    else
      await copyFile(sourcePath, destinationPath);

    return destinationPath;

  } catch (error) {
    await message("Failed to copy: " + error, {
      title: "DotTex",
      kind: "error",
    });
    throw error;
  }
};

export const moveItem = async (
  sourcePath: string,
  destinationParentPath: string,
  name: string
) => {
  try {
    const destinationPath = await join(destinationParentPath, name);

    const alreadyExists = await exists(destinationPath);
    if (alreadyExists) {
      throw new Error("Destination already exists");
    }

    await rename(sourcePath, destinationPath);

    return destinationPath;
  } catch (error) {
    await message("Failed to move: " + error, {
      title: "DotTex",
      kind: "error",
    });
    throw error;
  }
};

export const renameItem = async (
  itemPath: string,
  newName: string
) => {
  try {
    const newFilePath = await join(await dirname(itemPath), newName);

    const alreadyExists = await exists(newFilePath);
    if (alreadyExists) throw "file with that name already exists"

    await rename(itemPath, newFilePath);

  } catch (error) {
    await message("Failed to rename: " + error, {
      title: "DotTex",
      kind: "error",
    });
    throw error;
  }
}

export const deleteItem = async (
  itemPath: string
) => {
  try {
    await remove(itemPath, { recursive: true });

  } catch (error) {
    await message("Failed to delete: " + error, {
      title: "DotTex",
      kind: "error",
    });
    throw error;
  }
}
const copyDirectoryRecursive = async (
  sourceDir: string,
  destinationDir: string
) => {
  await mkdir(destinationDir);
  try {
    const entries = await readDir(sourceDir);
    for (const entry of entries) {
      const srcPath = await join(sourceDir, entry.name);
      const destPath = await join(destinationDir, entry.name);

      if (entry.isDirectory) {
        await copyDirectoryRecursive(srcPath, destPath);
      } else {
        await copyFile(srcPath, destPath);
      }
    }
  } catch (error) {
    await remove(destinationDir, { recursive: true });
    await message("Failed to copy: " + error, {
      title: "DotTex",
      kind: "error",
    });
    throw error;
  }
};