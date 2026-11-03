const Database = require('better-sqlite3');

// 1. Create or connect to the database file
const db = new Database('campus.db');

// 2. Create the listings table if it doesn't exist yet
db.exec(`
  CREATE TABLE IF NOT EXISTS listings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    price TEXT NOT NULL,
    category TEXT NOT NULL,
    condition TEXT NOT NULL,
    image TEXT
  )
`);
// Add this right below db.exec(`CREATE TABLE IF NOT EXISTS listings...`)
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);

console.log("Database connected and table ready.");

// 3. Export the database so server.js can use it
module.exports = db;