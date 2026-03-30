import { Button } from "./ui/button"
import { useProjectActions } from "@/utils/useProjectActions";
import DotTex from "../assets/DotTex.png"
export const EmptyEditor = () => {
    const { handleOpen, handleCreate } = useProjectActions();
    return (
        <section className="flex flex-col justify-center items-center space-y-15 h-full">
            <div>
                <img src={DotTex} alt="DotTex Logo" className="w-85" />
            </div>
            <div>
                <Button variant={"ghost"} onClick={handleCreate}>New Project</Button>
                <Button variant={"ghost"} onClick={handleOpen}>Open Project</Button>
            </div>
        </section>
    )
}