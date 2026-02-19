import { Button } from "@/components/ui/button"
import { DirectorySchema } from "@/utils/OpenCreateProject"
import { useFileStore } from "@/stores/useFileStore"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react"
export function FileTree() {

    const { folderTree, isProjectOpen } = useFileStore();

    const renderItem = (fileItem: DirectorySchema) => {
        if ("items" in fileItem) {
            return (
                <Collapsible key={fileItem.name}>
                    <CollapsibleTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="group hover:bg-accent hover:text-accent-foreground w-full justify-start transition-none"
                        >
                            <ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />
                            <FolderIcon />
                            {fileItem.name}
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="style-lyra:ml-4 mt-1 ml-5">
                        <div className="flex flex-col gap-1">
                            {fileItem.items?.map((child) => renderItem(child))}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            )
        }
        return (
            <Button
                key={fileItem.name}
                variant="link"
                size="sm"
                className="text-foreground w-full justify-start gap-2"
            >
                <FileIcon />
                <span>{fileItem.name}</span>
            </Button>
        )
    }

    return (
        <aside className="w-full h-full bg-background border-r border-border flex flex-col justify-around">
            <h1 className="py-3  px-4 flex items-center text-lg">Explorer</h1>
            <section className={`flex-1 ${!isProjectOpen && "flex flex-col items-center"}`}>
                {
                    isProjectOpen
                    ? folderTree.map((item) => renderItem(item))
                    : <Button>Open A Folder</Button>
                }
            </section>

        </aside>)
}
