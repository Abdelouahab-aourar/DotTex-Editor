import { DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut } from "../ui/dropdown-menu"
import { OpenFolder } from "@/utils/OpenProject"
import { useFileStore } from "@/stores/useFileStore";


export const FileDropdown = () => {
    const {setFolderTree, setProjectOpen} = useFileStore();    
    const handleOpen = async () => {
        const tree = await OpenFolder()
        if(tree.length > 0){
            setFolderTree(tree)
            setProjectOpen(true)
        }
    }
    return (
        <DropdownMenuContent className="w-60" align="start">
            <DropdownMenuItem onClick={() => handleOpen()}>
                New Project
                <DropdownMenuShortcut>ctrl+N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleOpen()}>
                Open Project
                <DropdownMenuShortcut>ctrl+O</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
                Close Project
                <DropdownMenuShortcut></DropdownMenuShortcut>
            </DropdownMenuItem>
        </DropdownMenuContent>
    )
}