import { Expand, Minus, X } from "lucide-react"
import { getCurrentWindow } from "@tauri-apps/api/window";

import { Button } from "./ui/button";

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
export const Titlebar = () => {
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
        "File",
        "Edit",
        "Run"
    ]
    return (

        <header data-tauri-drag-region className="select-none flex justify-between items-center bg-background border-b border-b-border px-4 py-1">

            <div className="flex space-x-6">
                <h1 className="text-xl " data-tauri-drag-region="false">
                    L
                </h1>
                <div className="flex items-center space-x-1" data-tauri-drag-region="false">
                    {
                        tools.map((s, i) => {
                            return (
                                <Button variant="ghost" size="sm">{s}</Button>
                            )
                        })
                    }
                </div>

            </div>
            <div className="flex space-x-2" data-tauri-drag-region="false">
                {
                    windowControls.map((item, key) => {
                        const Item = item.btn
                        return (
                            <div key={key} className={`w-4 h-4 rounded-full ${item.bgColor} flex items-center justify-center`} onClick={item.action}>
                                <Item
                                    className="w-2.5 h-2.5 text-black/80 opacity-20 hover:opacity-100 transition-opacity"
                                    strokeWidth={2.5}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </header>
    )
}