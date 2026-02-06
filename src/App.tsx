import "./App.css";
import { Editor } from "@monaco-editor/react";
import { Sidebar } from "./components/Sidebar";
import { Explorer } from "./components/Explorer";
import { Titlebar } from "./components/Titlebar";

import { useState } from "react";



function App() {  

  const [explorerOpen, setExplorerOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);


  return (
    <section className="h-screen overflow-hidden flex flex-col bg-background">

      <Titlebar />

      <div className="flex flex-1 items-center">
        <div className="flex h-full">
          <Sidebar explorerOpen={explorerOpen} setExplorerOpen={setExplorerOpen} selected={selected} setSelected={setSelected} />
          {
            explorerOpen && <Explorer selected={selected} />
          }
        </div>
        <div className="flex-1 h-full pt-2">
          <Editor theme="vs-dark" height={"100%"} language="javascript" />
        </div>
      </div>

    </section>
  );
}

export default App;
