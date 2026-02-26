import { useFileStore } from "@/stores/useFileStore";
import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut } from "../ui/context-menu"
import { DirectorySchema } from "@/utils/OpenCreateProject";
import { deleteItem } from "@/utils/FileTreeUtils";

type Props = {
    createFolderSetup: () => void;
    renameItemSetup: () => void;
    fileItem: DirectorySchema;
}
export const FileTreeContextMenu = ({ createFolderSetup, renameItemSetup, fileItem }: Props) => {

    const { setSourcePath, setDestinationPath, setAction, doAction, refreshTree } = useFileStore()

    return (
        <ContextMenuContent className="w-50">

            <ContextMenuItem onClick={createFolderSetup}>
                New Folder...
            </ContextMenuItem>

            <ContextMenuSeparator />

            <ContextMenuItem onClick={() => {
                setSourcePath(fileItem.path);
                setAction("move");
            }}>
                Cut
                <ContextMenuShortcut>ctrl + x</ContextMenuShortcut>
            </ContextMenuItem>

            <ContextMenuItem onClick={() => {
                setSourcePath(fileItem.path);
                setAction("copy");
            }}>
                Copy
                <ContextMenuShortcut>ctrl + c</ContextMenuShortcut>
            </ContextMenuItem>

            <ContextMenuItem disabled={!fileItem.items} onClick={async () => {
                setDestinationPath(fileItem.path);
                await doAction();
                await refreshTree();
            }}>
                Paste
                <ContextMenuShortcut>ctrl + v</ContextMenuShortcut>
            </ContextMenuItem>

            <ContextMenuSeparator />

            <ContextMenuItem onClick={renameItemSetup}>
                Rename...
                <ContextMenuShortcut>F2</ContextMenuShortcut>
            </ContextMenuItem>

            <ContextMenuItem onClick={async () => {
                await deleteItem(fileItem.path);
                await refreshTree();
            }}>
                Delete
                <ContextMenuShortcut>del</ContextMenuShortcut>
            </ContextMenuItem>

        </ContextMenuContent >

    )

}