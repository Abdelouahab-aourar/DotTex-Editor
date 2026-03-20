use rusqlite::{Connection, params};
use std::fs;
use std::sync::OnceLock;
use std::path::PathBuf;

static DB_PATH: OnceLock<PathBuf> = OnceLock::new();

fn get_db_path() -> Result<&'static PathBuf, String> {
    let path = {
        let program_data = dirs_next::data_dir()
            .ok_or_else(|| "Could not find data directory".to_string())?;
        let app_dir = program_data.join("tex-ide").join("DB");
        fs::create_dir_all(&app_dir)
            .map_err(|e| format!("Failed to create app dir: {}", e))?;
        app_dir.join("history.db")
    };
    Ok(DB_PATH.get_or_init(|| path))
}

pub fn connect() -> Result<Connection, String> {
    let path = get_db_path()?;
    Connection::open(path).map_err(|e| e.to_string())
}

pub fn init_db() -> Result<String, String> {
    let conn = connect()?;
    conn.execute(
        "CREATE TABLE IF NOT EXISTS HISTORY (
            id   INTEGER PRIMARY KEY AUTOINCREMENT,
            path TEXT NOT NULL
        )",
        [],
    )
    .map_err(|e| format!("Failed to create HISTORY table: {}", e))?;
    Ok("DB initialized successfully".into())
}
#[tauri::command]
pub fn add_to_history(path: String) -> Result<String, String> {
    let conn = connect()?;
    conn.execute(
        "INSERT INTO HISTORY (path) VALUES (?1)",
        params![path],
    )
    .map_err(|e| e.to_string())?;
    Ok("Path added successfully".into())
}

#[tauri::command]
pub fn get_history() -> Result<Vec<String>, String> {
    let conn = connect()?;
    let mut stmt = conn
        .prepare("SELECT path FROM HISTORY ORDER BY id DESC LIMIT 5")
        .map_err(|e| e.to_string())?;

    let paths = stmt
        .query_map([], |row| row.get(0))
        .map_err(|e| e.to_string())?
        .collect::<Result<Vec<String>, _>>()
        .map_err(|e| e.to_string())?;
    Ok(paths)
}