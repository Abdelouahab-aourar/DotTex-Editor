import { DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut } from "../ui/dropdown-menu"
import { useProjectActions } from "@/utils/useProjectActions"
export const FileDropdown = () => {
    const { handleOpen, handleCreate, closeProject } = useProjectActions();
    return (
        <DropdownMenuContent className="w-60" align="start">
            <DropdownMenuItem onClick={handleCreate}>
                New Project
                <DropdownMenuShortcut>Ctrl+N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleOpen}>
                Open Project
                <DropdownMenuShortcut>Ctrl+O</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={closeProject}>
                Close Project
                <DropdownMenuShortcut>Ctrl+W</DropdownMenuShortcut>
            </DropdownMenuItem>
        </DropdownMenuContent>
    )
}