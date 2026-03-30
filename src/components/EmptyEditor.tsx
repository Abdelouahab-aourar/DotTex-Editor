import { Button } from "./ui/button"
import { useProjectActions } from "@/utils/useProjectActions";
export const EmptyEditor = () => {
    const { handleOpen, handleCreate } = useProjectActions();
    return (
        <section className="flex flex-col justify-center items-center space-y-40 h-full">
            <div className="text-7xl">LOGO</div>
            <div>
                <Button variant={"ghost"} onClick={handleCreate}>New Project</Button>
                <Button variant={"ghost"} onClick={handleOpen}>Open Project</Button>
            </div>
        </section>
    )
}