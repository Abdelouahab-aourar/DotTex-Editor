import { DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut } from "../ui/dropdown-menu"



export const FileDropdown = () => {

    return (
        <DropdownMenuContent className="w-60" align="start">
            <DropdownMenuItem>
                New Document
                <DropdownMenuShortcut>ctrl+N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
                Open Document
                <DropdownMenuShortcut>ctrl+O</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
                Close Document
                <DropdownMenuShortcut></DropdownMenuShortcut>
            </DropdownMenuItem>
        </DropdownMenuContent>
    )


}