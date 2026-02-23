import { create } from "zustand"

interface SearchResult {
    line: number
    preview: string
    range: any
}

interface EditorState {
    editor: any | null
    setEditor: (editor: any) => void

    content: string
    getContent: () => string
    setContent: (c: string | undefined) => void


    undo: () => void
    redo: () => void
    find: () => void
    replace: () => void
    closeFindReplace: () => void

    searchResults: SearchResult[]
    searchInFile: (query: string) => void
    revealMatch: (range: any) => void

    replaceOne: (range: any, value: string) => void
    replaceAll: (value: string) => void
}

export const useEditorStore = create<EditorState>((set, get) => ({
    editor: null,

    setEditor: (editor) => {
        set({ editor })

        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape") get().closeFindReplace()
        })

    },

    content: "",
    getContent: () => get().content,
    setContent: (c: string | undefined) => set({ content: c ? c : "" }),

    undo: () => get().editor?.trigger("keyboard", "undo", null),
    redo: () => get().editor?.trigger("keyboard", "redo", null),
    find: () => get().editor?.trigger("keyboard", "actions.find", null),
    replace: () =>
        get().editor?.trigger(
            "keyboard",
            "editor.action.startFindReplaceAction",
            null
        ),
    closeFindReplace: () => get().editor?.trigger("keyboard", "closeFindWidget", null),

    searchResults: [],
    searchInFile: (query) => {
        const editor = get().editor
        if (!editor || !query) {
            set({ searchResults: [] })
            return
        }

        const model = editor.getModel()
        if (!model) return

        const matches = model.findMatches(
            query,
            true,   // searchScope
            false,  // isRegex
            false,  // matchCase
            null,   // wordSeparators
            true    // captureMatches
        )

        const results = matches.map((m: any) => ({
            line: m.range.startLineNumber,
            preview: model.getLineContent(m.range.startLineNumber).trim(),
            range: m.range,
        }))

        set({ searchResults: results })
    },

    revealMatch: (range) => {
        const editor = get().editor
        if (!editor) return

        editor.revealRangeInCenter(range)
        editor.setSelection(range)
        editor.focus()
    },

    replaceOne: (range, value) => {
        const editor = get().editor
        if (!editor) return

        const model = editor.getModel()
        if (!model) return

        model.pushEditOperations(
            [],
            [{ range, text: value }],
            () => null
        )

        editor.focus()
    },

    replaceAll: (value) => {
        const editor = get().editor
        const { searchResults } = get()
        if (!editor || searchResults.length === 0) return

        const model = editor.getModel()
        if (!model) return

        const edits = searchResults.map((r) => ({
            range: r.range,
            text: value,
        }))

        model.pushEditOperations([], edits, () => null)

        set({ searchResults: [] })

        editor.focus()
    },
}))
