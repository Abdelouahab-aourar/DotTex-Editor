import { useFileStore } from "@/stores/useFileStore";
import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut } from "../ui/context-menu"
import { DirectorySchema } from "@/utils/OpenCreateProject";

type Props = {
    createFolderSetup: () => void;
    fileItem: DirectorySchema;
}
export const FileTreeContextMenu = ({ createFolderSetup, fileItem }: Props) => {

    const { setSourcePath, setDestinationPath, setAction, doAction, refreshTree } = useFileStore()

    return (
        <ContextMenuContent className="w-50">

            <ContextMenuItem>
                New File...
            </ContextMenuItem>

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
                console.log("COPYING:", fileItem.name, fileItem.path);
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

            <ContextMenuItem>
                Rename...
                <ContextMenuShortcut>F2</ContextMenuShortcut>
            </ContextMenuItem>

            <ContextMenuItem>
                Delete
                <ContextMenuShortcut>del</ContextMenuShortcut>
            </ContextMenuItem>

        </ContextMenuContent >

    )

}