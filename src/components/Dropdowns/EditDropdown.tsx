import { useEditorStore } from "@/stores/editorStore"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut } from "../ui/dropdown-menu"



export const EditDropdown = () => {

    const { undo, redo, find, replace } = useEditorStore()

    return (
        <DropdownMenuContent className="w-60" align="start">
            <DropdownMenuItem onClick={undo}>
                Undo
                <DropdownMenuShortcut>ctrl+Z</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={redo}>
                Redo
                <DropdownMenuShortcut>ctrl+Y</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={find}>
                Find
                <DropdownMenuShortcut>ctrl+F</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={replace}>
                Replace
                <DropdownMenuShortcut>ctrl+H</DropdownMenuShortcut>
            </DropdownMenuItem>
        </DropdownMenuContent>
    )


}