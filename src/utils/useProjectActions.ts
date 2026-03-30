import { useFileStore } from "@/stores/useFileStore";
import { CreateProject, OpenProject } from "@/utils/OpenCreateProject";
import { writeTextFile } from "@tauri-apps/plugin-fs";
import { invoke } from "@tauri-apps/api/core";
import { useEditorStore } from "@/stores/editorStore";
export const useProjectActions = () => {
    const { setFolderTree, setProjectOpen, setMainFilePath, setMainFileName, mainFilePath } = useFileStore();
    const { getContent } = useEditorStore()
    const handleOpen = async () => {
        const tree = await OpenProject();
        if (tree && tree.fileTree.length > 0) {
            setFolderTree(tree.fileTree);
            setProjectOpen(true);
            setMainFilePath(tree.mainFilePath);
            setMainFileName(tree.mainFileName);
        }
    };
    const handleCreate = async () => {
        const tree = await CreateProject();
        if (tree && tree.fileTree.length > 0) {
            setFolderTree(tree.fileTree);
            setProjectOpen(true);
            setMainFilePath(tree.mainFilePath);
            setMainFileName(tree.mainFileName);
        }
    };

    const closeProject = () => {
        setFolderTree([]);
        setProjectOpen(false);
        setMainFilePath("");
        setMainFileName("");
    };

    const buildPDF = async () => {
        try {
            await writeTextFile(mainFilePath, getContent())
            console.log("Compiling ...")
            await invoke("compile_latex", { texPath: mainFilePath });
        } catch (error) {
            console.log(`an error occured. ${error}`)
        }
    }
    return { handleOpen, handleCreate, closeProject, buildPDF };
};