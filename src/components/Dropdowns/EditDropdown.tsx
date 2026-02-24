import { useEditorStore } from "@/stores/editorStore"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut } from "../ui/dropdown-menu"



export const EditDropdown = () => {

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
        </DropdownMenuContent>
    )


}