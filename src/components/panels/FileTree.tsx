import { Button } from "@/components/ui/button"
import { DirectorySchema } from "@/utils/OpenCreateProject"
import { useFileStore } from "@/stores/useFileStore"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronRightIcon, FileIcon, FolderPlus, RotateCw } from "lucide-react"
import { createFolder, renameItem } from "@/utils/FileTreeUtils"
import { useState } from "react"
import { Input } from "../ui/input"
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu"
import { FileTreeContextMenu } from "../Dropdowns/FileTreeContextMenu"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "../ui/hover-card"
export function FileTree() {
    const { folderTree, refreshTree, isProjectOpen } = useFileStore();
    const [creatingInPath, setCreatingInPath] = useState<string | null>(null);
    const [newFolderName, setNewFolderName] = useState("");
    const [renamingItem, setRenamingItem] = useState<string | null>(null);
    const [newName, setNewName] = useState("");
    const renderItem = (fileItem: DirectorySchema) => {
        const renameItemSetup = () => {
            setRenamingItem(fileItem.path);
            setNewName(fileItem.name);
        }
        if ("items" in fileItem) {
            const createFolderSetup = () => {
                setCreatingInPath(fileItem.path);
                setNewFolderName("");
            }
            return (
                <ContextMenu>
                    <ContextMenuTrigger>
                        <Collapsible>
                            {
                                renamingItem !== fileItem.path
                                    ? <CollapsibleTrigger asChild>
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
                                    : <Input
                                        autoFocus
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        onKeyDown={async (e) => {
                                            if (e.key === "Enter" && newName.trim()) {
                                                await renameItem(fileItem.path, newName.trim());
                                                setRenamingItem(null);
                                                setNewName("");
                                                await refreshTree();
                                            }

                                            if (e.key === "Escape") {
                                                setRenamingItem(null);
                                                setNewName("");
                                            }
                                        }}
                                        onBlur={() => {
                                            setRenamingItem(null);
                                            setNewName("");
                                        }}
                                        placeholder="New name . . ."
                                        className="h-7 text-sm"
                                    />

                            }
                            <CollapsibleContent className="style-lyra:ml-4 mt-1 ml-5">
                                {
                                    creatingInPath === fileItem.path && (
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
                                    )
                                }
                                <div className="flex flex-col gap-1">
                                    {fileItem.items?.map((child) => renderItem(child))}
                                </div>

                            </CollapsibleContent>
                        </Collapsible>
                    </ContextMenuTrigger>
                    <FileTreeContextMenu createFolderSetup={createFolderSetup} renameItemSetup={renameItemSetup} fileItem={fileItem} />
                </ContextMenu>

            )
        }
        return (
            <ContextMenu>
                <ContextMenuTrigger>
                    {
                        renamingItem !== fileItem.path
                            ? <Button
                                variant="link"
                                size="sm"
                                className="text-foreground w-full justify-start gap-2"
                            >
                                <FileIcon />
                                <span className="text-text">{fileItem.name}</span>
                            </Button>
                            : <Input
                                autoFocus
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                onKeyDown={async (e) => {
                                    if (e.key === "Enter" && newName.trim()) {
                                        await renameItem(fileItem.path, newName.trim());
                                        setRenamingItem(null);
                                        setNewName("");
                                        await refreshTree();
                                    }

                                    if (e.key === "Escape") {
                                        setRenamingItem(null);
                                        setNewName("");
                                    }
                                }}
                                onBlur={() => {
                                    setRenamingItem(null);
                                    setNewName("");
                                }}
                                placeholder="New name . . ."
                                className="h-7 text-sm"
                            />

                    }
                </ContextMenuTrigger>
                <FileTreeContextMenu createFolderSetup={() => null} renameItemSetup={renameItemSetup} fileItem={fileItem} />
            </ContextMenu>
        )
    }

    return (
        <aside className="w-full h-full min-h-0 bg-background border-r border-border flex flex-col">
            <div className="flex justify-around items-center">
                <h1 className="py-3  px-4 flex items-center text-lg shrink-0">Explorer</h1>
                <HoverCard openDelay={0} closeDelay={0}>
                    <HoverCardTrigger>
                        <Button onClick={() => refreshTree()} variant="ghost">
                            <RotateCw />
                        </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="text-xs w-fit p-2">
                        refresh
                    </HoverCardContent>
                </HoverCard>
            </div>
            <section className={`flex-1 min-h-0 overflow-y-auto overflow-x-hidden ${!isProjectOpen ? "flex flex-col items-center" : ""}`}>
                {
                    isProjectOpen
                        ? folderTree.map((item) => renderItem(item))
                        : <p className="text-sm text-text/50">No folder is open</p>
                }
            </section>

        </aside>)
}
