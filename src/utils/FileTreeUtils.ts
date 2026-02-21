import { mkdir, exists, copyFile, rename } from "@tauri-apps/plugin-fs";
import { join } from "@tauri-apps/api/path";
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
      title: 'tex-ide',
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

    const alreadyExists = await exists(destinationPath);
    if (alreadyExists) {
      throw new Error("Destination already exists");
    }

    await copyFile(sourcePath, destinationPath);

    return destinationPath;
  } catch (error) {
    await message("Failed to copy: " + error, {
      title: "tex-ide",
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
      title: "tex-ide",
      kind: "error",
    });
    throw error;
  }
};