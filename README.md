# 🧪 LaTeX IDE — Desktop App

A modern, cross-platform LaTeX editor built as a desktop application. Write, compile, and preview LaTeX documents locally — no internet connection required, no subscriptions, no cloud.

> Built with Tauri · TypeScript · Tailwind CSS · Rust · SQLite · Tectonic

---

## ✨ Features

- 📝 **Full-featured LaTeX editor** with syntax highlighting
- ⚡ **One-click compilation** powered by [Tectonic](https://github.com/tectonic-typesetting/tectonic/) as a bundled sidecar binary
- 📄 **Integrated PDF viewer** — preview your compiled document side-by-side
- 💾 **Project management** with SQLite for persistent local storage
- 🚀 **Blazing fast** native performance via Rust backend
- 🌐 **Internet on first use** — Tectonic auto-downloads only the LaTeX packages your document needs, then caches them locally for all future compilations

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Desktop Shell & Backend** | Tauri v2 + Rust |
| **Frontend** | TypeScript, Tailwind CSS |
| **Database** | SQLite (via `rusqlite`) |
| **LaTeX Engine** | [Tectonic](https://github.com/tectonic-typesetting/tectonic/) (bundled sidecar) |
| **PDF Viewer** | Embedded PDF renderer |
| **Package Manager** | pnpm |

---

## 📦 Downloads
 
Just want to try the app? No need to clone or build anything — grab the latest pre-built installer for your platform directly from the **GitHub Releases** page:
 
🔗 **[Latest Release → GitHub Releases](https://github.com/Abdelouahab-aourar/DotTex-IDE/releases/latest)**
 
| Platform | File |
|---|---|
| 🪟 **Windows** | `.msi` or `.exe` installer |
| 🍎 **macOS** | `.dmg` disk image |
| 🐧 **Linux** | `.AppImage` or `.deb` package |
 
> **Note:** On the first compilation of a LaTeX document, Tectonic will need an internet connection to download the required LaTeX packages. After that, everything runs offline.
 
---
## 📸 Screenshots

![IDE View](/screenshots/screenshot1.png)

---

## 📋 Prerequisites

If you want to clone the repo, make sure the following are installed on your system before you begin:

| Tool | Version | Link |
|---|---|---|
| **Node.js** | ≥ 18 | https://nodejs.org |
| **pnpm** | ≥ 8 | https://pnpm.io/installation |
| **Rust + Cargo** | stable | https://rustup.rs |

> **Linux only:** You may also need system dependencies for Tauri. See the [Tauri prerequisites guide](https://tauri.app/start/prerequisites/).

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Abdelouahab-aourar/DotTex-IDE
cd DotTex-IDE
```

---

### 2. Download the Tectonic Binary

Tectonic is used as a **Tauri sidecar** — a bundled binary that the app calls at runtime to compile LaTeX files. You must download the correct pre-built binary for your platform and place it in the right location with the exact expected filename.

#### Step 1 — Download

Go to the official Tectonic releases page:

🔗 **https://github.com/tectonic-typesetting/tectonic/releases/latest**

Download the archive that matches your operating system and architecture:

| Platform | File to download |
|---|---|
| Windows x86_64 | `tectonic-*-x86_64-pc-windows-msvc.zip` |
| macOS x86_64 (Intel) | `tectonic-*-x86_64-apple-darwin.tar.gz` |
| macOS ARM64 (Apple Silicon) | `tectonic-*-aarch64-apple-darwin.tar.gz` |
| Linux x86_64 | `tectonic-*-x86_64-unknown-linux-musl.tar.gz` |
| Linux ARM64 | `tectonic-*-aarch64-unknown-linux-musl.tar.gz` |

Extract the archive to get the `tectonic` (or `tectonic.exe` on Windows) binary.

---

#### Step 2 — Rename the Binary

Tauri sidecar binaries **must be named using the Rust target triple** of the platform they are built for. Rename the extracted binary as follows:

**Pattern:**
```
tectonic-{arch}-{vendor}-{os}-{abi}[.exe]
```

**Platform-specific filenames:**

| Platform | Rename to |
|---|---|
| Windows x86_64 | `tectonic-x86_64-pc-windows-msvc.exe` |
| macOS x86_64 (Intel) | `tectonic-x86_64-apple-darwin` |
| macOS ARM64 (Apple Silicon) | `tectonic-aarch64-apple-darwin` |
| Linux x86_64 | `tectonic-x86_64-unknown-linux-gnu` |
| Linux ARM64 | `tectonic-aarch64-unknown-linux-gnu` |

> 💡 **Tip:** To find your exact Rust target triple, run:
> ```bash
> rustc -vV | grep host
> ```
> The value after `host:` is your target triple. Append it to `tectonic-` to get the correct filename.

---

#### Step 3 — Place the Binary

Move the renamed binary into the sidecar directory:

```
src-tauri/
└── binaries/
    └── tectonic-x86_64-pc-windows-msvc.exe   ← example (Windows)
    └── tectonic-x86_64-apple-darwin           ← example (macOS Intel)
    └── tectonic-aarch64-apple-darwin          ← example (macOS ARM)
    └── tectonic-x86_64-unknown-linux-gnu      ← example (Linux x86_64)
```

> On **macOS/Linux**, make sure the binary is executable:
> ```bash
> chmod +x src-tauri/binaries/tectonic-*
> ```

---

> ### 🌐 Note on Internet & LaTeX Packages
> Unlike a traditional LaTeX installation (TeX Live, MiKTeX) that requires gigabytes of upfront downloads, **Tectonic fetches only the packages your document actually uses**, on demand, from the [CTAN bundle](https://ctan.org/) — the first time it encounters them. After that, packages are **cached locally** and compilation is fully offline.
>
> This means:
> - **First compilation** of a document may take a few seconds longer while packages are downloaded
> - **Subsequent compilations** are fully offline and fast
> - An internet connection is **only needed when a new package is encountered** for the first time
> - The cache is typically stored in your system's user data directory

---

### 3. Install Frontend Dependencies

```bash
pnpm i
```

---

### 4. Run in Development Mode

```bash
pnpm tauri dev
```

This will:
- Start the Vite dev server for the frontend
- Compile and launch the Tauri Rust backend
- Open the app window

---

### 5. Build for Production

```bash
pnpm tauri build
```

The compiled installer/bundle will be output to:

```
src-tauri/target/release/bundle/
```

---

## 🐛 Troubleshooting

### `Error: sidecar binary not found`
Make sure the Tectonic binary is placed in `src-tauri/binaries/` and is named **exactly** with the correct target triple suffix. Run `rustc -vV | grep host` to get your exact triple.

### `Permission denied` on macOS/Linux
The binary needs execute permission:
```bash
chmod +x src-tauri/binaries/tectonic-*
```

### `pnpm: command not found`
Install pnpm globally via:
```bash
npm install -g pnpm
```
## 🔭 Future Vision
 
This project is actively evolving. Here's what's on the horizon:
 
### 🧠 TexLab LSP Integration
[TexLab](https://github.com/latex-lsp/texlab) is a full-featured **Language Server Protocol (LSP)** implementation for LaTeX. Integrating it into the editor will unlock a professional-grade writing experience, including:
- ✅ Real-time diagnostics and error highlighting as you type
- 🔍 Auto-completion for commands, environments, citations, and references
- 🏷️ Go-to-definition and symbol navigation across files
- 📐 Document outline and structure view
 
This will significantly close the gap with web-based editors like Overleaf while keeping everything local and offline.
 
---
 
### 🦀 Migrating to a Pure Rust Backend
 
Currently the application backend is powered by **Tauri's command layer** on top of Rust, which is a solid foundation. The long-term vision is to graduate toward a **standalone Rust backend** — decoupled from Tauri's IPC model — that exposes a proper internal API. This would:
- Make the core logic fully **framework-agnostic** and independently testable
- Enable potential **CLI usage** of the backend without the desktop shell
- Allow the project to scale into a **multi-frontend architecture** (desktop, web, or headless server) sharing the same Rust core
- Improve contributor experience by giving backend developers a clean Rust crate to work on without needing frontend knowledge
 
---
 
### 👥 Open to Contributors
 
Both of these tracks are great entry points for contributors:
- **Frontend / editor engineers** — help integrate TexLab and build the editor UX around LSP features
- **Rust / backend engineers** — help design and implement the standalone Rust backend architecture
 
If either of these excites you, open an issue or start a discussion — all ideas are welcome.
 
---
## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss your idea, then submit a pull request.
Good starting points:
- 🐛 Bug fixes and issue reports
- ✨ New features (please open an issue first to discuss)
- 🧹 Code refactoring and cleanup — the codebase always welcomes improved structure, better abstractions, and reduced duplication
- 📖 Documentation improvements

Steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push and open a Pull Request

---
 
## 📄 License

This project is licensed under the [MIT License](LICENSE).

---