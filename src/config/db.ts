import sqlite3,{Database} from "sqlite3";

let db: Database;

export function getSqliteDb({verbose}:{verbose:boolean}) {
  if (db) {
    return db;
  }
  if (verbose) {
    sqlite3.verbose()
  }
  db = new Database("./db/amazon.db", (err) => {
    if (err) {
      console.log(`Error: ${err}`);
    }
    console.log("connected to db");
  });
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS products(
      _id INTEGER PRIMARY KEY,
      name TEXT NOT NULL, 
      description TEXT, 
      price REAL, 
      stock INTEGER, 
      createdAt TEXT, 
      updatedAt TEXT
    )`)
    .run(`INSERT OR REPLACE INTO products(
      _id,
      name,
      description,
      price,
      stock,
      createdAt,
      updatedAt
    ) VALUES (
      1,
      'Tenis Addidad Yezzy',
      'Color naranja y verde',
      4999.99,
      100,
      datetime('now','localtime'),
      datetime('now','localtime')
    )`);
  });
  return db;
}
