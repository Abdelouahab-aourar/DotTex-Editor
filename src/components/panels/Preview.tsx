import { useEffect, useState } from "react"
import { readFile } from "@tauri-apps/plugin-fs"
import { PDFViewer } from "@embedpdf/react-pdf-viewer"
import { useFileStore } from "@/stores/useFileStore"

export const Preview = () => {

    const { mainFilePath } = useFileStore()
    const [pdfUrl, setPdfUrl] = useState<string | null>(null)

    useEffect(() => {
        const loadPdf = async () => {
            const pdfPath = mainFilePath.replace(".tex", ".pdf")

            const data = await readFile(pdfPath)

            const blob = new Blob([data], { type: "application/pdf" })
            const url = URL.createObjectURL(blob)

            setPdfUrl(url)
        }

        loadPdf()
    }, [mainFilePath])

    if (!pdfUrl) return (
        <div className="w-full h-full flex justify-center items-center">
            <h1 className="text-text text-5xl w-full text-center">
                No Document
            </h1>
        </div>
    )

    return (
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
            style={{ height: "100%" }}
        />
    )
}