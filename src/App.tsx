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
import { Console } from "./components/panels/Console";
import { Preview } from "./components/panels/Preview";
import { OpenProjectOnStartup } from "./utils/OpenCreateProject";

function App() {
  const [selected, setSelected] = useState<number | null>(null);

  const { isProjectOpen, mainFilePath, setProjectOpen, setMainFilePath, setMainFileName, setFolderTree } = useFileStore();

  const lastSelected = useRef<number | null>(0);
  const expandMethod = useRef<"click" | "drag" | null>(null);

  const { setEditor, content, setContent } = useEditorStore();

  const ref = usePanelRef();

  const consoleRef = usePanelRef();
  const toggleConsole = () => {
    consoleRef.current?.isCollapsed() ? consoleRef.current?.expand() : consoleRef.current?.collapse();
  }

  const previewRef = usePanelRef();
  const togglePreview = () => {
    previewRef.current?.isCollapsed() ? previewRef.current?.expand() : previewRef.current?.collapse();
  }

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
  const handleBeforeMount = (monaco: any) => {
    monaco.languages.register({
      id: 'latex',
      extensions: ['.tex', '.sty', '.cls'],
      aliases: ['LaTeX', 'latex', 'TeX'],
      mimetypes: ['text/x-latex'],
    });
    monaco.languages.setMonarchTokensProvider('latex', {
      defaultToken: '',
      keywords: [
        'documentclass', 'usepackage', 'begin', 'end',
        'section', 'subsection', 'subsubsection', 'paragraph', 'chapter',
        'label', 'ref', 'cite', 'caption', 'include', 'input',
        'maketitle', 'tableofcontents', 'title', 'author', 'date',
        'newcommand', 'renewcommand', 'newenvironment', 'renewenvironment',
      ],
      tokenizer: {
        root: [
          [/%.*/, 'comment'],
          [/\\begin(?=\{)/, 'keyword.control', '@environment'],
          [/\\end(?=\{)/, 'keyword.control', '@environment'],
          [/\\([a-zA-Z]+\*?)/, {
            cases: {
              '@keywords': 'keyword',
              '@default': 'variable.source',
            }
          }],
          [/\\[^a-zA-Z]/, 'constant.character.escape'],
          [/\$\$/, 'string.date', '@mathDisplay$$'],
          [/\$/, 'string.date', '@mathInline'],
          [/\\\[/, 'string.date', '@mathDisplayBracket'],
          [/[{}]/, 'delimiter.curly'],
          [/[\[\]]/, 'delimiter.square'],
          [/[()]/, 'delimiter.paren'],
        ],
        environment: [
          [/\{/, 'delimiter.curly'],
          [/[a-zA-Z0-9*]+/, 'tag'],
          [/\}/, 'delimiter.curly', '@pop'],
        ],
        mathInline: [
          [/\$/, 'string.date', '@pop'],
          [/\\[a-zA-Z]+\*?/, 'keyword.math'],
          [/\\[^a-zA-Z]/, 'constant.character.escape'],
          [/[^$\\]+/, 'string.date'],
        ],
        'mathDisplay$$': [
          [/\$\$/, 'string.date', '@pop'],
          [/\\[a-zA-Z]+\*?/, 'keyword.math'],
          [/\\[^a-zA-Z]/, 'constant.character.escape'],
          [/[^$\\]+/, 'string.date'],
        ],
        mathDisplayBracket: [
          [/\\\]/, 'string.date', '@pop'],
          [/\\[a-zA-Z]+\*?/, 'keyword.math'],
          [/\\[^a-zA-Z]/, 'constant.character.escape'],
          [/[^\\\]]+/, 'string.date'],
        ],
      },
    });
    monaco.editor.defineTheme('latex-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'keyword.control', foreground: 'c792ea', fontStyle: 'bold' },
        { token: 'keyword', foreground: '82aaff', fontStyle: 'bold' },
        { token: 'keyword.math', foreground: 'ff5370' },
        { token: 'variable.source', foreground: '89ddff' },
        { token: 'tag', foreground: 'ffcb6b', fontStyle: 'bold' },
        { token: 'string.date', foreground: 'c3e88d' },
        { token: 'constant.character.escape', foreground: 'f07178' },
        { token: 'delimiter.curly', foreground: 'ffd700' },
        { token: 'delimiter.square', foreground: 'e0af68' },
        { token: 'delimiter.paren', foreground: 'e0af68' },
      ],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#eeffff',
        'editor.lineHighlightBackground': '#00000040',
        'editor.selectionBackground': '#c792ea33',
        'editorLineNumber.foreground': '#3b4252',
        'editorLineNumber.activeForeground': '#82aaff',
        'editorCursor.foreground': '#ffcb6b',
        'editorBracketMatch.background': '#ffcb6b33',
        'editorBracketMatch.border': '#ffcb6b',
      },
    });
  };
  const handleMount = (editor: any) => {
    setEditor(editor);
  };
  useEffect(() => {
    const loadFile = async () => {
      const fileData = await readTextFile(mainFilePath)
      setContent(fileData);
    };
    loadFile();
  }, [mainFilePath]);

  useEffect(() => {
    const handleOpen = async () => {
      const tree = await OpenProjectOnStartup()
      if (tree && tree.fileTree.length > 0) {
        setFolderTree(tree.fileTree)
        setProjectOpen(true)
        setMainFilePath(tree.mainFilePath)
        setMainFileName(tree.mainFileName)
      }
    }
    handleOpen();
  }, []);
  return (
    <section className="h-screen flex flex-col bg-background">
      <Titlebar toggleConsole={toggleConsole} />
      <div className="flex flex-1 h-[90vh] items-center overflow-clip">
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
            className="h-[95vh]"
            maxSize="50%"
            onResize={handlePanelResize}
          >
            <Explorer selected={selected} />
          </Panel>

          <Panel>
            {
              isProjectOpen
                ? <Group orientation="horizontal">
                  <Panel>
                    <Group orientation="vertical">
                      <Panel className="flex flex-col justify-between items-center space-y-2">
                        <Filetab togglePreview={togglePreview} />
                        <Editor
                          className="flex-1"
                          theme="latex-dark"
                          language="latex"
                          height={"100%"}
                          value={content}
                          onChange={(e) => setContent(e)}
                          beforeMount={handleBeforeMount}
                          onMount={handleMount} />
                      </Panel>
                      <Panel
                        panelRef={consoleRef}
                        defaultSize={"15%"}
                        collapsible
                        minSize={150}
                        maxSize="70%"
                      >
                        <Console />
                      </Panel>
                    </Group>
                  </Panel>
                  <Panel
                    panelRef={previewRef}
                    defaultSize="0%"
                    collapsible
                    minSize={250}
                    maxSize="50%"
                  >
                    <Preview />
                  </Panel>
                </Group>
                : <EmptyEditor />

            }
          </Panel>
        </Group>
      </div>
    </section>
  );
}

export default App;