import { Columns2, FileCheckCorner, Ghost } from "lucide-react"
import { Button } from "./ui/button"



export const Filetab = () => {

    return (
        <div className="select-none flex justify-between items-center bg-background border-b border-b-border px-4 h-10 w-full">
            <div className="flex justify-between items-center">
                document.tex
                <div className="w-2 h-2 rounded-full bg-text mx-3">

                </div>
            </div>

            <div className="flex items-center justify-around">
                <Button variant="ghost" size="icon">
                    <FileCheckCorner />
                </Button>
                <Button variant="ghost" size="icon">
                    <Columns2 />
                </Button>
            </div>

        </div>
    )


} 