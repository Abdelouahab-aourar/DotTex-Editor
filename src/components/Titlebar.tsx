import { Expand, Minus, X } from "lucide-react"
import { getCurrentWindow } from "@tauri-apps/api/window";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { FileDropdown } from "./Dropdowns/FileDropdown";
import { EditDropdown } from "./Dropdowns/EditDropdown";
import { RunDropdown } from "./Dropdowns/RunDropdown";
import DotTex from "../assets/DotTex.png"
type Props = {
    toggleConsole: () => void
}

const appWindow = getCurrentWindow();
async function minimize() {
    await appWindow.minimize();
}
async function toggleMaximize() {
    const isMax = await appWindow.isMaximized();
    isMax ? await appWindow.unmaximize() : await appWindow.maximize();
}
async function closeWindow() {
    await appWindow.close();
}
export const Titlebar = ({ toggleConsole }: Props) => {
    const windowControls = [
        {
            btn: Minus,
            bgColor: "bg-yellow-400",
            action: minimize
        },
        {
            btn: Expand,
            bgColor: "bg-green-500",
            action: toggleMaximize
        },
        {
            btn: X,
            bgColor: "bg-red-500",
            action: closeWindow
        }
    ]
    const tools = [
        { label: "File", Menu: FileDropdown },
        { label: "Edit", Menu: EditDropdown },
        { label: "Run", Menu: RunDropdown }
    ]
    return (
        <header data-tauri-drag-region className="select-none flex justify-between items-center bg-background border-b border-b-border px-4">
            <div className="flex items-center space-x-6">
                <div data-tauri-drag-region="false" className="w-10 h-6">
                    <img src={DotTex} alt="DotTex Logo" />
                </div>
                <div className="flex items-center space-x-1" data-tauri-drag-region="false">
                    {
                        tools.map((tool, key) => {
                            const Content = tool.Menu;
                            return (
                                <DropdownMenu key={key}>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost">{tool.label}</Button>
                                    </DropdownMenuTrigger>
                                    <Content toggleConsole={toggleConsole} />
                                </DropdownMenu>)
                        })
                    }
                </div>
            </div>
            <div className="flex space-x-1" data-tauri-drag-region="false">
                {
                    windowControls.map((item, key) => {
                        const Item = item.btn
                        return (
                            <div className="w-6 h-8 cursor-pointer flex items-center justify-center" onClick={item.action}>
                                <div key={key} className={`w-4 h-4 rounded-full ${item.bgColor} flex items-center justify-center`}>
                                    <Item
                                        className="w-2.5 h-2.5 text-black/80 opacity-20 hover:opacity-100 transition-opacity"
                                        strokeWidth={2.5}
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </header>
    )
}