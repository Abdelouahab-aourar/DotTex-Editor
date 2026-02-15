import { Button } from "./ui/button"


export const EmptyEditor = () => {

    return (
        <section className="flex flex-col justify-center items-center space-y-40 h-full">
            <div className="text-7xl">LOGO</div>
            
            <div>
                <Button variant={"ghost"}>New Project</Button>
                <Button variant={"ghost"}>Open Project</Button>
            </div>

        </section>

    )


}