import { DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut } from "../ui/dropdown-menu"
import { useProjectActions } from "@/utils/useProjectActions"
export const RunDropdown = () => {
    const { buildPDF } = useProjectActions()
    return (
        <DropdownMenuContent className="w-60" align="start">
            <DropdownMenuItem onClick={buildPDF}>
                Build PDF
                <DropdownMenuShortcut>Ctrl+S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
                Preview PDF
            </DropdownMenuItem>
        </DropdownMenuContent>
    )
}