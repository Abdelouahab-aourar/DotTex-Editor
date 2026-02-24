import { DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut } from "../ui/dropdown-menu"
import { CreateProject, OpenProject } from "@/utils/OpenCreateProject"
import { useFileStore } from "@/stores/useFileStore";
import { writeTextFile } from "@tauri-apps/plugin-fs";
import { useEditorStore } from "@/stores/editorStore";
export const FileDropdown = () => {
    const {setFolderTree, setProjectOpen, setMainFilePath, setMainFileName, mainFilePath} = useFileStore();
    const { getContent } = useEditorStore();
    const handleOpen = async () => {
        const tree = await OpenProject()
        if(tree && tree.fileTree.length > 0){
            setFolderTree(tree.fileTree)
            setProjectOpen(true)
            setMainFilePath(tree.mainFilePath)
            setMainFileName(tree.mainFileName)
        }
    }
    const handleCreate = async () => {
        const tree = await CreateProject()
        if(tree && tree.fileTree.length > 0){
            setFolderTree(tree.fileTree)
            setProjectOpen(true)
            setMainFilePath(tree.mainFilePath)
            setMainFileName(tree.mainFileName)
        }
    }
    const closeProject = () => {
        setFolderTree([])
        setProjectOpen(false)
        setMainFilePath("")
        setMainFileName("")
    }
    const saveProject = async () => {
        await writeTextFile(mainFilePath, getContent())
    }
    return (
        <DropdownMenuContent className="w-60" align="start">
            <DropdownMenuItem onClick={() => handleCreate()}>
                New Project
                <DropdownMenuShortcut>Ctrl+N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleOpen()}>
                Open Project
                <DropdownMenuShortcut>Ctrl+O</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => saveProject()}>
                Save Project
                <DropdownMenuShortcut>Ctrl+S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => closeProject()}>
                Close Project
                <DropdownMenuShortcut></DropdownMenuShortcut>
            </DropdownMenuItem>
        </DropdownMenuContent>
    )
}