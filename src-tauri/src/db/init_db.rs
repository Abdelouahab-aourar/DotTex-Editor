use rusqlite::Connection;
use once_cell::sync::Lazy;
use std::fs::{self, OpenOptions};
use std::path::PathBuf;

pub static DB_PATH: Lazy<Result<PathBuf, String>> = Lazy::new(|| {
    let program_data = dirs_next::data_dir()
        .ok_or_else(|| "Could not find data directory".to_string())?;

    let app_dir = program_data.join("tex-ide").join("DB");

    fs::create_dir_all(&app_dir)
        .map_err(|e| format!("Failed to create app dir: {}", e))?;

    let db_path = app_dir.join("history.db");

    OpenOptions::new()
        .read(true)
        .write(true)
        .create(true)
        .open(&db_path)
        .map_err(|e| format!("Failed to create db file: {}", e))?;

    Ok(db_path)
});

pub fn connect() -> Result<Connection, String> {
    let path = DB_PATH.as_ref()
        .map_err(|e| format!("DB path error: {}", e))?;

    let conn = Connection::open(path)
        .map_err(|e| format!("Failed to open DB connection: {}", e))?;

    Ok(conn)
}

pub fn init_db() -> Result<String, String> {
    let conn = connect()?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS HISTORY (
            id        INTEGER PRIMARY KEY AUTOINCREMENT,
            path      TEXT NOT NULL
            )",
        [],
    )
    .map_err(|e| format!("Failed to create HISTORY table: {}", e))?;

    Ok("All tables created successfully".into())
}