mod db;
use db::{init_db, add_to_history, get_history};
mod latex;
use latex::compile_latex;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_opener::init())
        .setup(|_app| {
            init_db().expect("Failed to initialize database");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            compile_latex,
            add_to_history,
            get_history
            ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}