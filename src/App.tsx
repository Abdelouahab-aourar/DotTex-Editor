import "./App.css";
import { Editor } from "@monaco-editor/react";
import { Sidebar } from "./components/Sidebar";
import { Explorer } from "./components/Explorer";
import { Titlebar } from "./components/Titlebar";

import { useRef, useState, useEffect } from "react";
import { Panel, Group, usePanelRef, PanelSize } from "react-resizable-panels";
import { useEditorStore } from "./stores/editorStore";
import { Filetab } from "./components/Filetab";
import { useFileStore } from "./stores/useFileStore";
import { EmptyEditor } from "./components/EmptyEditor";
import { readTextFile } from "@tauri-apps/plugin-fs";
function App() {
  const [selected, setSelected] = useState<number | null>(null);

  const { isProjectOpen, mainFilePath } = useFileStore();

  const lastSelected = useRef<number | null>(0);
  const expandMethod = useRef<"click" | "drag" | null>(null);

  const { setEditor, content, setContent } = useEditorStore();

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


  useEffect(() => {
  const loadFile = async () => {
    const fileData = await readTextFile(mainFilePath)
    setContent(fileData);
  };
  loadFile();
}, [mainFilePath]);
  return (
    <section className="h-screen overflow-hidden flex flex-col bg-background">
      <Titlebar />

      <div className="flex flex-1 items-center overflow-clip">
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

          <Panel className="flex flex-col justify-between items-center space-y-2">
            {
              isProjectOpen
                ? <>
                  <Filetab />
                  <Editor
                    className="flex-1"
                    theme="vs-dark"
                    height={"100%"}
                    value={content}
                    onChange={(e) => setContent(e)}
                    onMount={(editor: any) => {
                      setEditor(editor);
                    }} />
                </>
                : <EmptyEditor />

            }
          </Panel>
        </Group>
      </div>
    </section>
  );
}

export default App;