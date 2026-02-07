import { Folder, FolderOpen, Search } from 'lucide-react'

type Props = {
    explorerOpen: boolean
    setExplorerOpen: (state: boolean) => void
    selected: number|null
    setSelected: (state: number|null) => void
}

export const Sidebar = ({ explorerOpen, setExplorerOpen, selected, setSelected }: Props) => {

    const handleIconClick = (index: number) => {
        if (explorerOpen && selected === index) {
            setExplorerOpen(false);
            setSelected(null);
        } else {
            setSelected(index);
            setExplorerOpen(true);
        }
    };

    const navItems = [
        { id: 0, activeIcon: FolderOpen, inactiveIcon: Folder },
        { id: 1, activeIcon: Search, inactiveIcon: Search },
    ];

    return (
        <aside className="w-15 h-full py-3 bg-background border-r border-white flex flex-col space-y-3 items-center">
            {
                navItems.map((item, key) => {
                    const isSelected = selected === item.id;
                    const IconTag = (isSelected && explorerOpen) ? item.activeIcon : item.inactiveIcon;

                    return (
                        <div key={key} className={`px-2 py-2 ${isSelected ? "border-l-2 border-l-blue-500" : "border-l-2 border-l-transparent"} border-r-2 border-r-transparent flex items-center justify-center`}>
                            <IconTag
                                key={item.id}
                                size={32}
                                color="white"
                                strokeWidth={2}

                                className={`hover:cursor-pointer transition-all`}
                                onClick={() => handleIconClick(item.id)}
                            />
                        </div>
                    );
                })
            }
        </aside>
    );
};