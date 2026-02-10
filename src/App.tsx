import "./App.css";
import { Editor } from "@monaco-editor/react";
import { Sidebar } from "./components/Sidebar";
import { Explorer } from "./components/Explorer";
import { Titlebar } from "./components/Titlebar";

import { useRef, useState } from "react";
import { Panel, Group, usePanelRef, PanelSize } from "react-resizable-panels";

function App() {
  const [selected, setSelected] = useState<number | null>(null);

  const lastSelected = useRef<number | null>(0);
  const expandMethod = useRef<"click" | "drag" | null>(null);

  const ref = usePanelRef();

  const collapsePanel = () => {
    ref.current?.collapse();
  };

  const expandPanel = () => {
    ref.current?.expand();
  };

  const handlePanelResize = (
    panelSize: PanelSize,
    _id: string | number | undefined,
    prevPanelSize?: PanelSize
  ) => {
    const isCollapsed = panelSize.inPixels === 0;
    const wasCollapsed = prevPanelSize?.inPixels === 0;

    if (isCollapsed && !wasCollapsed) {
      if (selected !== null) {
        lastSelected.current = selected;
      }
      setSelected(null);
      expandMethod.current = null;
    }

    if (!isCollapsed && wasCollapsed) {
      if (expandMethod.current !== "click") {
        setSelected(lastSelected.current);
      }

      expandMethod.current = null;
    }
  };

  return (
    <section className="h-screen overflow-hidden flex flex-col bg-background">
      <Titlebar />

      <div className="flex flex-1 items-center">
        <Sidebar
          selected={selected}
          setSelected={setSelected}
          collapsePanel={collapsePanel}
          expandPanel={expandPanel}
          expandMethod={expandMethod}
        />

        <Group>
          <Panel
            defaultSize="0%"
            panelRef={ref}
            collapsible
            minSize={150}
            maxSize="70%"
            onResize={handlePanelResize}
          >
            <Explorer selected={selected} />
          </Panel>

          <Panel>
            <Editor theme="vs-dark" height={"100%"} language="javascript" />
          </Panel>
        </Group>
      </div>
    </section>
  );
}

export default App;