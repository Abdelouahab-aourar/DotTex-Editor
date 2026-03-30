import { useEffect, useRef } from "react";
import clsx from "clsx";
import { Button } from "../ui/button";
import { useConsoleStore, LogLevel } from "@/stores/consoleStore";
export const Console = () => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const { title, logs, clearConsole } = useConsoleStore();
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [logs]);
    const levelStyles: Record<LogLevel, string> = {
        info: "text-slate-300",
        warn: "text-yellow-400",
        error: "text-red-400",
        success: "text-emerald-400",
    };
    return (
        <div className="flex flex-col h-full bg-black border border-border rounded-sm shadow-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-1 bg-background/60 border-b border-border">
                <h2 className="text-sm font-semibold text-text">
                    {title}
                </h2>
                <Button
                    variant="ghost"
                    onClick={clearConsole}
                >
                    Clear
                </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-1 font-mono text-sm">
                {
                    logs.length === 0 && (
                        <div className="text-slate-500 italic">No compilation output</div>
                    )
                }
                {
                    logs.map((log) => (
                        <div
                            key={log.id}
                            className={clsx(
                                "whitespace-pre-wrap wrap-break-words",
                                levelStyles[log.level ?? "info"]
                            )}
                        >
                            {log.timestamp && (
                                <span className="text-slate-500 mr-2">
                                    [{log.timestamp.toLocaleTimeString()}]
                                </span>
                            )}
                            {log.message}
                        </div>
                    ))
                }
                <div ref={bottomRef} />
            </div>
        </div>
    );
};