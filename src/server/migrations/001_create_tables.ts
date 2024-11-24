import { Database } from 'sqlite3';

export async function up(db: Database): Promise<void> {
  // Create admins table
  await db.run(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insert default admin user
  await db.run(`
    INSERT OR IGNORE INTO admins (username, password) VALUES ('admin', 'admin')
  `);

  // Create simulations table
  await db.run(`
    CREATE TABLE IF NOT EXISTS simulations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      term INTEGER NOT NULL,
      income REAL NOT NULL,
      employment TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      monthly_payment REAL NOT NULL,
      vehicle_id TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}
