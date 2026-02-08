import "./App.css";
import { Editor } from "@monaco-editor/react";
import { Sidebar } from "./components/Sidebar";
import { Explorer } from "./components/Explorer";
import { Titlebar } from "./components/Titlebar";

import { useRef, useState } from "react";
import { Panel, Group, usePanelRef, PanelSize } from "react-resizable-panels";

function App() {

  const [explorerOpen, setExplorerOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [lastSelected, setLastSelected] = useState<number | null>(null);

  const expandMethod = useRef<"click" | "drag" | null >(null);

  const ref = usePanelRef();
  const collapsePanel = () => {
    ref.current?.collapse();
  }
  const expandPanel = () => {
    ref.current?.expand();
  }

  const handlePanelCollapse = (panelSize : PanelSize, id: string | number | undefined, prevPanelSize : PanelSize | undefined) => {
    if(panelSize.inPixels === 0)
    {
      setLastSelected(selected);
      setSelected(null);
    }
    if(panelSize.inPixels > 0 && prevPanelSize?.inPixels === 0)
    {
      if(expandMethod.current !== "click")
        setSelected(lastSelected)
    
      expandMethod.current = null;

    }

    id;
  }

  return (
    <section className="h-screen overflow-hidden flex flex-col bg-background">

      <Titlebar />

      <div className="flex flex-1 items-center">
        <Sidebar explorerOpen={explorerOpen} setExplorerOpen={setExplorerOpen} selected={selected} setSelected={setSelected} collapsePanel={collapsePanel} expandPanel={expandPanel} expandMethod={expandMethod} />

        <Group>
          {
            explorerOpen &&
            <Panel panelRef={ref} collapsible minSize={150} maxSize="70%" onResize={handlePanelCollapse}>

              <Explorer selected={selected} />

            </Panel>
          }
          <Panel defaultSize="90%">
            <Editor theme="vs-dark" height={"100%"} language="javascript" />
          </Panel>

        </Group>

      </div>

    </section>
  );
}

export default App;
