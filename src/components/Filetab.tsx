import { Columns2, FileCheckCorner } from "lucide-react"
import { Button } from "./ui/button"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./ui/hover-card"
import { useFileStore } from "@/stores/useFileStore"
import { useProjectActions } from "@/utils/useProjectActions"
type Props = {
    togglePreview: () => void
}
export const Filetab = ({ togglePreview }: Props) => {
    const { mainFileName } = useFileStore()
    const { buildPDF } = useProjectActions()
    return (
        <div className="select-none flex justify-between items-center bg-background border-b border-b-border px-4 h-10 w-full">
            <div className="flex justify-between items-center">
                {mainFileName}
            </div>
            <div className="flex items-center justify-around">
                <HoverCard openDelay={0} closeDelay={0}>
                    <HoverCardTrigger>
                        <Button variant="ghost" size="icon" onClick={buildPDF}>
                            <FileCheckCorner />
                        </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="text-xs w-fit p-2">
                        Build PDF
                    </HoverCardContent>
                </HoverCard>
                <HoverCard openDelay={0} closeDelay={0}>
                    <HoverCardTrigger>
                        <Button variant="ghost" size="icon" onClick={() => togglePreview()}>
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