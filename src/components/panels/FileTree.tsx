import { Button } from "@/components/ui/button"
import { DirectorySchema } from "@/utils/OpenCreateProject"
import { useFileStore } from "@/stores/useFileStore"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronRightIcon, FileIcon, FolderPlus } from "lucide-react"
import { createFolder } from "@/utils/FileTreeUtils"
import { useState } from "react"
import { Input } from "../ui/input"
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu"
import { FileTreeContextMenu } from "../Dropdowns/FileTreeContextMenu"
export function FileTree() {

    const { folderTree, refreshTree, isProjectOpen } = useFileStore();

    const [creatingInPath, setCreatingInPath] = useState<string | null>(null);
    const [newFolderName, setNewFolderName] = useState("");

    const renderItem = (fileItem: DirectorySchema) => {
        if ("items" in fileItem) {
            const createFolderSetup = () => {
                setCreatingInPath(fileItem.path);
                setNewFolderName("");
            }
            return (
                <ContextMenu>
                    <ContextMenuTrigger>

                        <Collapsible key={fileItem.name}>
                            <CollapsibleTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="group hover:bg-accent hover:text-accent-foreground w-full justify-between transition-none"
                                >
                                    <div className="flex flex-1 space-x-1">
                                        <ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />
                                        <p>
                                            {fileItem.name}
                                        </p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            createFolderSetup()
                                        }}
                                    >
                                        <FolderPlus />
                                    </Button>
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="style-lyra:ml-4 mt-1 ml-5">
                                {
                                    creatingInPath === fileItem.path && (
                                        <div className="">
                                            <Input
                                                autoFocus
                                                value={newFolderName}
                                                onChange={(e) => setNewFolderName(e.target.value)}
                                                onKeyDown={async (e) => {
                                                    if (e.key === "Enter" && newFolderName.trim()) {
                                                        await createFolder(fileItem.path, newFolderName.trim());
                                                        setCreatingInPath(null);
                                                        setNewFolderName("");
                                                        refreshTree();
                                                    }

                                                    if (e.key === "Escape") {
                                                        setCreatingInPath(null);
                                                        setNewFolderName("");
                                                    }
                                                }}
                                                onBlur={() => {
                                                    setCreatingInPath(null);
                                                    setNewFolderName("");
                                                }}
                                                placeholder="New folder name"
                                                className="h-7 text-sm"
                                            />
                                        </div>
                                    )
                                }
                                <div className="flex flex-col gap-1">
                                    {fileItem.items?.map((child) => renderItem(child))}
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    </ContextMenuTrigger>
                    <FileTreeContextMenu createFolderSetup={createFolderSetup} fileItem={fileItem} />
                </ContextMenu>

            )
        }
        return (
            <ContextMenu>
                <ContextMenuTrigger>
                    <Button
                        key={fileItem.name}
                        variant="link"
                        size="sm"
                        className="text-foreground w-full justify-start gap-2"
                    >
                        <FileIcon />
                        <span className="text-text">{fileItem.name}</span>
                    </Button>
                </ContextMenuTrigger>
                <FileTreeContextMenu createFolderSetup={() => null} fileItem={fileItem} />
            </ContextMenu>
        )
    }

    return (
        <aside className="w-full h-full min-h-0 bg-background border-r border-border flex flex-col">
            <h1 className="py-3  px-4 flex items-center text-lg shrink-0">Explorer</h1>
            <section className={`flex-1 min-h-0 overflow-y-auto ${!isProjectOpen ? "flex flex-col items-center" : ""}`}>
                {
                    isProjectOpen
                        ? folderTree.map((item) => renderItem(item))
                        : <p className="text-sm text-text/50">No folder is open</p>
                }
            </section>

        </aside>)
}
