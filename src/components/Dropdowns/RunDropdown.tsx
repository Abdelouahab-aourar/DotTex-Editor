import { DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut } from "../ui/dropdown-menu"



export const RunDropdown = () => {

    return (
        <DropdownMenuContent className="w-60" align="start">
            <DropdownMenuItem>
                Build PDF
                <DropdownMenuShortcut>F5</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
                Preview PDF
                <DropdownMenuShortcut>F12</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
                Open PDF
                <DropdownMenuShortcut>ctrl+F12</DropdownMenuShortcut>
            </DropdownMenuItem>
        </DropdownMenuContent>
    )


}