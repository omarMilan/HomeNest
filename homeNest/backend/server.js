import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const dbPromise = open({
  filename: "./users.db",
  driver: sqlite3.Database,
});

app.post("/auth", async (req, res) => {
  const { username, password } = req.body;
  const db = await dbPromise;
  const user = await db.get("SELECT * FROM users WHERE username = ?", username);

  if (user) {
    if (user.password === password) {
      res.json({ message: "Logged in!" });
    } else {
      res.status(401).json({ error: "Wrong password." });
    }
  } else {
    await db.run(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      username,
      password
    );
    res.json({ message: "Account created!" });
  }
});

const startServer = async () => {
  const db = await dbPromise;
  await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
