import { DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut } from "../ui/dropdown-menu"
export const RunDropdown = () => {
    return (
        <DropdownMenuContent className="w-60" align="start">
            <DropdownMenuItem>
                Build PDF
                <DropdownMenuShortcut>Ctrl+S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
                Preview PDF
            </DropdownMenuItem>
        </DropdownMenuContent>
    )
}