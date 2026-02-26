import { create } from "zustand"

export type LogLevel = "info" | "warn" | "error" | "success";

interface LogEntry {
    id: string;
    message: string;
    level?: LogLevel;
    timestamp?: Date;
}


interface ConsoleState {
    logs: LogEntry[];
    title: string;
    logCount: number;

    pushLog: (msg: string, level: LogLevel) => void;

    clearConsole: () => void;
}

export const useConsoleStore = create<ConsoleState>((set) => ({

    logs: [],
    title: "Logs",
    logCount: 0,

    pushLog: (msg: string, level: LogLevel = "info") => {
        set((state) => ({
            logs: [...state.logs, { id: String(state.logCount + 1), message: msg, level, timestamp: new Date() }],
            logCount: state.logCount + 1
        }))
    },

    clearConsole: () => {
        set({ logs: [], logCount: 0 })

    }


}))