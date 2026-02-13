import { DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut } from "../ui/dropdown-menu"
import { OpenFolder } from "@/utils/OpenProject"


export const FileDropdown = () => {

    return (
        <DropdownMenuContent className="w-60" align="start">
            <DropdownMenuItem onClick={OpenFolder}>
                New Project
                <DropdownMenuShortcut>ctrl+N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={OpenFolder}>
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