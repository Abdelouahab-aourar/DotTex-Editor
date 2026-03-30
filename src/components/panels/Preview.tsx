import { useEffect, useState } from "react"
import { readFile } from "@tauri-apps/plugin-fs"
import { PDFViewer } from "@embedpdf/react-pdf-viewer"
import { useFileStore } from "@/stores/useFileStore"
import { useProjectActions } from "@/utils/useProjectActions"
export const Preview = () => {
    const { buildPDF } = useProjectActions()
    const { mainFilePath } = useFileStore()
    const [pdfUrl, setPdfUrl] = useState<string | null>(null)

    useEffect(() => {
        let objectUrl: string | null = null

        const loadPdf = async () => {
            if (!mainFilePath) {
                setPdfUrl(null)
                return
            }
            try {
                const pdfPath = mainFilePath.replace(".tex", ".pdf")
                const data = await readFile(pdfPath)
                const blob = new Blob([data], { type: "application/pdf" })
                objectUrl = URL.createObjectURL(blob)
                setPdfUrl(objectUrl)
            } catch {
                setPdfUrl(null)
            }
        }

        loadPdf()

        return () => {
            if (objectUrl) URL.revokeObjectURL(objectUrl)
        }
    }, [mainFilePath, buildPDF])

    if (!pdfUrl) return (
        <div className="w-full h-full flex justify-center items-center">
            <h1 className="text-text text-4xl w-full text-center">
                No Document
            </h1>
        </div>
    )

    return (
        <div className="w-full h-screen overflow-y-auto overflow-x-hidden">
            <PDFViewer
                config={{
                    src: pdfUrl,
                    disabledCategories: [
                        "annotation",
                        "redaction",
                        "document-print",
                        "document-export",
                        "panel",
                        "document",
                        "page"
                    ],
                    theme: { preference: "dark" }
                }}
                style={{ height: "95%" }}
            />
        </div>
    )
}