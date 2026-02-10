import { DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut } from "../ui/dropdown-menu"



export const EditDropdown = () => {

    return (
        <DropdownMenuContent className="w-60" align="start">
            <DropdownMenuItem>
                Undo
                <DropdownMenuShortcut>ctrl+Z</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
                Redo
                <DropdownMenuShortcut>ctrl+Y</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
                Find
                <DropdownMenuShortcut>ctrl+F</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
                Replace
                <DropdownMenuShortcut>ctrl+H</DropdownMenuShortcut>
            </DropdownMenuItem>
        </DropdownMenuContent>
    )


}