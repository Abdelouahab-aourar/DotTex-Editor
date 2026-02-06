import { Expand, Minimize2, Minus, X } from "lucide-react"
import { useState } from "react"



export const Titlebar = () => {

    const tools = [
        "File",
        "Edit",
        "Run"
    ]

    const [isMinimzed, setIsMinimized] = useState<boolean>(false);

    return (

        <header className="flex justify-between items-center bg-background border-b border-b-white p-2">

            <div className="flex space-x-6">
                <h1 className="text-xl text-white">
                    L
                </h1>

                <div className="flex space-x-2.5">
                    {
                        tools.map((s, i) => {

                            return (
                                <h3 key={i} className="text-white text-sm">{s}</h3>
                            )
                        })

                    }
                </div>

            </div>
            <div className="flex space-x-2">
                <div className="w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center">
                    <Minus
                        className="w-2.5 h-2.5 text-black/50 opacity-0 hover:opacity-100 transition-opacity"
                        strokeWidth={2.5}
                    />
                </div>

                <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                    <Expand
                        className="w-2.5 h-2.5 text-black/50 opacity-0 hover:opacity-100 transition-opacity"
                        strokeWidth={2.5}
                    />
                </div>

                <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                    <X
                        className="w-2.5 h-2.5 text-black/50 opacity-0 hover:opacity-100 transition-opacity"
                        strokeWidth={2.5}
                    />
                </div>
            </div>


        </header>

    )

}