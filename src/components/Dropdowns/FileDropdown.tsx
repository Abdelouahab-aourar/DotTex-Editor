import { DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut } from "../ui/dropdown-menu"
import { CreateProject, OpenProject } from "@/utils/OpenCreateProject"
import { useFileStore } from "@/stores/useFileStore";


export const FileDropdown = () => {
    const {setFolderTree, setProjectOpen, setMainFile} = useFileStore();    
    const handleOpen = async () => {
        const tree = await OpenProject()
        if(tree && tree.fileTree.length > 0){
            setFolderTree(tree.fileTree)
            setProjectOpen(true)
            setMainFile(tree.mainFile)
        }
    }
    const handleCreate = async () => {
        const tree = await CreateProject()
        if(tree && tree.length > 0){
            setFolderTree(tree)
            setProjectOpen(true)
            setMainFile("main.tex")
        }
    }
    const closeProject = () => {
        setFolderTree([])
        setProjectOpen(false)
        setMainFile("")
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
            <DropdownMenuItem onClick={() => closeProject()}>
                Close Project
                <DropdownMenuShortcut></DropdownMenuShortcut>
            </DropdownMenuItem>
        </DropdownMenuContent>
    )
}