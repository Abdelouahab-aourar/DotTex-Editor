import { FileTree } from "./panels/FileTree";
import { Search } from "./panels/Search";

type ExplorerProps = {
    selected: number | null
}

export const Explorer = ({ selected }: ExplorerProps) => {
    const panels: Record<number, React.ReactNode> = {
        0: <FileTree />,
        1: <Search />
    };

    return (
        <div className="h-full">    
            {selected !== null && panels[selected]}
        </div>
    )
}
