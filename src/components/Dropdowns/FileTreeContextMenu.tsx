import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut } from "../ui/context-menu"

type Props = {
    createFolderSetup: () => void;
}
export const FileTreeContextMenu = ({ createFolderSetup} : Props) => {

    return (
        <ContextMenuContent className="w-50">

            <ContextMenuItem>
                New File...
            </ContextMenuItem>

            <ContextMenuItem onClick={createFolderSetup}>
                New Folder...
            </ContextMenuItem>

            <ContextMenuSeparator />

            <ContextMenuItem>
                Cut
                <ContextMenuShortcut>ctrl + c</ContextMenuShortcut>
            </ContextMenuItem>

            <ContextMenuItem>
                Copy
                <ContextMenuShortcut>ctrl + x</ContextMenuShortcut>
            </ContextMenuItem>

            <ContextMenuItem>
                Paste
                <ContextMenuShortcut>ctrl + v</ContextMenuShortcut>
            </ContextMenuItem>

            <ContextMenuSeparator />

            <ContextMenuItem>
                Rename...
                <ContextMenuShortcut>F2</ContextMenuShortcut>
            </ContextMenuItem>

            <ContextMenuItem>
                Delete
                <ContextMenuShortcut>del</ContextMenuShortcut>
            </ContextMenuItem>

        </ContextMenuContent>

    )

}