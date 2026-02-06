use tauri::{AppHandle, Emitter, Manager};
use tauri_plugin_shell::ShellExt;
use tauri_plugin_shell::process::CommandEvent;

#[tauri::command]
async fn start_texlab(app_handle: AppHandle) {
    // let sidecar_command = app_handle
    //     .shell()
    //     .sidecar("texlab")
    //     .expect("failed to setup sidecar: check tauri.conf.json");

    // let (mut rx, mut _child) = sidecar_command
    //     .spawn()
    //     .expect("failed to spawn texlab");
    // tauri::async_runtime::spawn(async move {
    //     while let Some(event) = rx.recv().await {
    //         match event {
    //             CommandEvent::Stdout(line_bytes) => {
    //                 let line = String::from_utf8_lossy(&line_bytes).to_string();                    
    //                 let _ = app_handle.emit("lsp-data", line);
    //             }
    //             CommandEvent::Stderr(err_bytes) => {
    //                 let err = String::from_utf8_lossy(&err_bytes).to_string();
    //                 let _ = app_handle.emit("lsp-error", err);
    //             }
    //             _ => {}
    //         }
    //     }
    // });
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![start_texlab])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}