import { useEditorStore } from "@/stores/editorStore"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut } from "../ui/dropdown-menu"
type Props = {
    toggleConsole: () => void
}
export const EditDropdown = ({ toggleConsole }: Props) => {
    const { undo, redo, find, replace } = useEditorStore()
    return (
        <DropdownMenuContent className="w-60" align="start">
            <DropdownMenuItem onClick={undo}>
                Undo
                <DropdownMenuShortcut>Ctrl+Z</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={redo}>
                Redo
                <DropdownMenuShortcut>Ctrl+Y</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={find}>
                Find
                <DropdownMenuShortcut>Ctrl+F</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={replace}>
                Replace
                <DropdownMenuShortcut>Ctrl+H</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={toggleConsole}>
                Toggle Console
            </DropdownMenuItem>
        </DropdownMenuContent>
    )
}