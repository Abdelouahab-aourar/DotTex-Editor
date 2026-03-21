import { useEffect } from "react";
import { listen } from "@tauri-apps/api/event";
import { useConsoleStore } from "@/stores/consoleStore";
export function useTectonicLogs() {
    const { pushLog, clearConsole } = useConsoleStore();
    useEffect(() => {
        const unlisteners = [
            listen<string>("tectonic-log", (e) => {
                pushLog(e.payload, "info");
            }),
            listen<string>("tectonic-error", (e) => {
                pushLog(e.payload, "error");
            }),
            listen<string>("tectonic-done", (e) => {
                pushLog(e.payload, "success");
            }),
            listen<string>("tectonic-done-error", (e) => {
                pushLog(e.payload, "error");
            }),
        ];
        return () => {
            unlisteners.forEach((p) => p.then((f) => f()));
        };
    }, []);
    return { clearConsole };
}