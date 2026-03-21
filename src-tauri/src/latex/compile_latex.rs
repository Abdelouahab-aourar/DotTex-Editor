use tauri_plugin_shell::ShellExt;
use tauri::Emitter;
use tauri_plugin_shell::process::CommandEvent;
#[tauri::command]
pub async fn compile_latex(app: tauri::AppHandle, tex_path: String) -> Result<(), String> {
    let (mut rx, _child) = app
        .shell()
        .sidecar("tectonic")
        .map_err(|e| e.to_string())?
        .args(["-X", "compile", &tex_path])
        .spawn()
        .map_err(|e| format!("Failed to run Tectonic: {}", e))?;
    tauri::async_runtime::spawn(async move {
        while let Some(event) = rx.recv().await {
            match event {
                CommandEvent::Stdout(line) => {
                    let log = String::from_utf8_lossy(&line).to_string();
                    app.emit("tectonic-log", log).ok();
                }
                CommandEvent::Stderr(line) => {
                    let log = String::from_utf8_lossy(&line).to_string();
                    app.emit("tectonic-error", log).ok();
                }
                CommandEvent::Terminated(status) => {
                    if status.code == Some(0) {
                        app.emit("tectonic-done", "PDF generated successfully!").ok();
                    } else {
                        app.emit("tectonic-done-error", "Tectonic failed").ok();
                    }
                    break;
                }
                _ => {}
            }
        }
    });
    Ok(())
}