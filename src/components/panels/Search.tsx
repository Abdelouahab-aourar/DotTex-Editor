import { useState } from "react"
import { useEditorStore } from "@/stores/editorStore"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
export const Search = () => {
    const [query, setQuery] = useState("")
    const [replace, setReplace] = useState("")
    const {
        searchInFile,
        searchResults,
        revealMatch,
        replaceOne,
        replaceAll,
    } = useEditorStore()
    return (
        <aside className="w-full h-full bg-background border-r border-border flex flex-col">
            <h1 className="py-3  px-4 flex items-center text-lg">Search</h1>
            <div className="p-2 space-y-2">
                <Input
                    value={query}
                    onChange={(e) => {
                        const q = e.target.value
                        setQuery(q)
                        searchInFile(q)
                    }}
                    placeholder="Find"
                />
                <Input
                    value={replace}
                    onChange={(e) => setReplace(e.target.value)}
                    placeholder="Replace"
                />
                {searchResults.length > 0 && (
                    <Button
                        size="sm"
                        className="w-full"
                        onClick={() => replaceAll(replace)}
                    >
                        Replace All ({searchResults.length})
                    </Button>
                )}
            </div>
            <section className="flex-1 overflow-y-auto">
                {searchResults.map((r, i) => (
                    <div
                        key={i}
                        className="px-3 py-2 text-sm hover:bg-muted space-y-1"
                    >
                        <div
                            onClick={() => revealMatch(r.range)}
                            className="cursor-pointer"
                        >
                            <div className="text-xs text-muted-foreground">
                                Line {r.line}
                            </div>
                            <div className="truncate">{r.preview}</div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2"
                            onClick={() => replaceOne(r.range, replace)}
                        >
                            Replace
                        </Button>
                    </div>
                ))}
                {query && searchResults.length === 0 && (
                    <div className="p-3 text-sm text-muted-foreground">
                        No results
                    </div>
                )}
            </section>
        </aside>
    )
}