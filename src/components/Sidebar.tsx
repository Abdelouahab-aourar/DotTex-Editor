import { Folder, FolderOpen, Search } from 'lucide-react'

type Props = {
    explorerOpen: boolean
    setExplorerOpen: (state: boolean) => void
    selected: number|null
    setSelected: (state: number|null) => void
    collapsePanel: () => void
    expandPanel: () => void
    expandMethod: any
}

export const Sidebar = ({ explorerOpen, setExplorerOpen, selected, setSelected, collapsePanel, expandPanel, expandMethod }: Props) => {

    const handleIconClick = (index: number) => {
        if (explorerOpen && selected === index) {
            setExplorerOpen(false);
            setSelected(null);
            collapsePanel();
        } else {
            expandMethod.current = "click";
            setSelected(index);
            setExplorerOpen(true);
            expandPanel();
        }
    };

    const navItems = [
        { id: 0, activeIcon: FolderOpen, inactiveIcon: Folder },
        { id: 1, activeIcon: Search, inactiveIcon: Search },
    ];

    return (
        <aside className="w-15 h-full bg-background border-r border-border flex flex-col space-y-3 items-center">
            {
                navItems.map((item, key) => {
                    const isSelected = selected === item.id;
                    const IconTag = (isSelected && explorerOpen) ? item.activeIcon : item.inactiveIcon;

                    return (
                        <div key={key} className={`px-2 py-3 ${isSelected ? "border-l-2 border-l-blue-500" : "border-l-2 border-l-transparent"} border-r-2 border-r-transparent flex items-center justify-center`}>
                            <IconTag
                                key={item.id}
                                size={28}
                                strokeWidth={2}

                                className={`hover:cursor-pointer hover:text-text transition-all ${isSelected ? "text-text" : "text-stroke"}`}
                                onClick={() => handleIconClick(item.id)}
                            />
                        </div>
                    );
                })
            }
        </aside>
    );
};