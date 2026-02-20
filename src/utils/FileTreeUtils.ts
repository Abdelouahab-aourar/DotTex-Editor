import { mkdir, exists } from "@tauri-apps/plugin-fs";
import { join } from "@tauri-apps/api/path";

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
    console.error("Failed to create folder:", error);
    throw error;
  }
};

