use rusqlite::Connection;
use std::fs;
use std::thread;
pub fn init_db() -> Result<String, String> {
    thread::spawn(|| -> Result<(), String> {

        let program_data = dirs_next::data_dir()
            .ok_or_else(|| "Could not find data directory".to_string())?;

        let app_dir = program_data.join("tex-ide").join("DB");

        fs::create_dir_all(&app_dir)
            .map_err(|e| format!("Failed to create app dir: {}", e))?;

        let path = app_dir.join("history.db");

        let conn = Connection::open(&path)
            .map_err(|e| format!("Failed to open DB connection: {}", e))?;

        conn.execute(
            "CREATE TABLE IF NOT EXISTS HISTORY (
                id   INTEGER PRIMARY KEY AUTOINCREMENT,
                path TEXT NOT NULL
            )",
            [],
        )
        .map_err(|e| format!("Failed to create HISTORY table: {}", e))?;
        Ok(())
    });
    Ok("DB created successfully".into())
}