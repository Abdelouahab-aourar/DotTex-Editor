import { Columns2, FileCheckCorner } from "lucide-react"
import { Button } from "./ui/button"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./ui/hover-card"
import { useFileStore } from "@/stores/useFileStore"

export const Filetab = () => {
    const { mainFile } = useFileStore()

    return (
        <div className="select-none flex justify-between items-center bg-background border-b border-b-border px-4 h-10 w-full">
            <div className="flex justify-between items-center">
                {mainFile}
                <div className="w-2 h-2 rounded-full bg-text mx-3">

                </div>
            </div>


            <div className="flex items-center justify-around">
                <HoverCard openDelay={0} closeDelay={0}>
                    <HoverCardTrigger>
                        <Button variant="ghost" size="icon">
                            <FileCheckCorner />
                        </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="text-xs w-fit p-2">
                        Build PDF
                    </HoverCardContent>
                </HoverCard>
                <HoverCard openDelay={0} closeDelay={0}>
                    <HoverCardTrigger>
                        <Button variant="ghost" size="icon">
                            <Columns2 />
                        </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="text-xs w-fit p-2">
                        Preview PDF
                    </HoverCardContent>
                </HoverCard>
            </div>

        </div>
    )


} 