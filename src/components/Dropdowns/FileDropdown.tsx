import { DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut } from "../ui/dropdown-menu"
import { CreateProject, OpenProject } from "@/utils/OpenCreateProject"
import { useFileStore } from "@/stores/useFileStore";


export const FileDropdown = () => {
    const {setFolderTree, setProjectOpen} = useFileStore();    
    const handleOpen = async () => {
        const tree = await OpenProject()
        if(tree.length > 0){
            setFolderTree(tree)
            setProjectOpen(true)
        }
    }
    const handleCreate = async () => {
        const tree = await CreateProject()
        if(tree.length > 0){
            setFolderTree(tree)
            setProjectOpen(true)
        }
    }
    const closeProject = () => {
        setFolderTree([])
        setProjectOpen(false)
    }
    return (
        <DropdownMenuContent className="w-60" align="start">
            <DropdownMenuItem onClick={() => handleCreate()}>
                New Project
                <DropdownMenuShortcut>ctrl+N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleOpen()}>
                Open Project
                <DropdownMenuShortcut>ctrl+O</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => closeProject()}>
                Close Project
                <DropdownMenuShortcut></DropdownMenuShortcut>
            </DropdownMenuItem>
        </DropdownMenuContent>
    )
}