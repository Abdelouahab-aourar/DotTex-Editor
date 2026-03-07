import { Columns2, FileCheckCorner } from "lucide-react"
import { Button } from "./ui/button"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./ui/hover-card"
import { useFileStore } from "@/stores/useFileStore"
import { useEditorStore } from "@/stores/editorStore"
import { invoke } from "@tauri-apps/api/core"
import { writeTextFile } from "@tauri-apps/plugin-fs"



type Props = {
    togglePreview: () => void
}


export const Filetab = ({ togglePreview }: Props) => {
    const { mainFilePath, mainFileName } = useFileStore()
    const { getContent } = useEditorStore()
    const buildPDF = async () => {
        try {
            await writeTextFile(mainFilePath, getContent())
            console.log("Compiling ...")
            await invoke("compile_latex", { texPath: mainFilePath });
            console.log(getContent())
        } catch (error) {
            console.log(`an error occured. ${error}`)
        }
    }
    return (
        <div className="select-none flex justify-between items-center bg-background border-b border-b-border px-4 h-10 w-full">
            <div className="flex justify-between items-center">
                {mainFileName}
                <div className="w-2 h-2 rounded-full bg-text mx-3">

                </div>
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