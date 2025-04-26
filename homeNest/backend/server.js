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

// Login or Sign Up
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

// Add a new listing
app.post("/add-listing", async (req, res) => {
  const { username, booking_name, location, zipcode } = req.body;
  const db = await dbPromise;

  const user = await db.get("SELECT * FROM users WHERE username = ?", username);
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  await db.run(
    `INSERT INTO listings (user_id, booking_name, location, number_of_bookings, zipcode)
     VALUES (?, ?, ?, ?, ?)`,
    user.id,
    booking_name,
    location,
    0,
    zipcode
  );

  res.json({ message: "Listing added successfully!" });
});

// Get all listings for a specific user
app.get("/listings/:username", async (req, res) => {
  const { username } = req.params;
  const db = await dbPromise;

  const user = await db.get("SELECT * FROM users WHERE username = ?", username);
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  const listings = await db.all(
    `SELECT booking_name, location, number_of_bookings, zipcode FROM listings WHERE user_id = ?`,
    user.id
  );

  res.json(listings);
});

// Book a listing (increase number_of_bookings by 1)
app.post("/book-listing", async (req, res) => {
  const { booking_name, location, zipcode } = req.body;
  const db = await dbPromise;

  await db.run(
    `UPDATE listings
     SET number_of_bookings = number_of_bookings + 1
     WHERE booking_name = ? AND location = ? AND zipcode = ?`,
    booking_name,
    location,
    zipcode
  );

  res.json({ message: "Booking recorded!" });
});

// Get all listings (show owner's username too)
app.get("/listings-all", async (req, res) => {
  const db = await dbPromise;
  const listings = await db.all(
    `SELECT listings.booking_name, listings.location, listings.zipcode, listings.number_of_bookings, users.username AS owner
     FROM listings
     JOIN users ON listings.user_id = users.id`
  );
  res.json(listings);
});

// Get listings filtered by zipcode (show owner's username too)
app.get("/listings-by-zipcode", async (req, res) => {
  const { zipcode } = req.query;
  const db = await dbPromise;

  const listings = await db.all(
    `SELECT listings.booking_name, listings.location, listings.zipcode, listings.number_of_bookings, users.username AS owner
     FROM listings
     JOIN users ON listings.user_id = users.id
     WHERE listings.zipcode = ?`,
    zipcode
  );
  res.json(listings);
});

// Get all listings (for customers)
app.get("/listings-all", async (req, res) => {
  const db = await dbPromise;
  const listings = await db.all(
    `SELECT booking_name, location, zipcode FROM listings`
  );
  res.json(listings);
});

// Get listings filtered by zipcode
app.get("/listings-by-zipcode", async (req, res) => {
  const { zipcode } = req.query;
  const db = await dbPromise;

  const listings = await db.all(
    `SELECT booking_name, location, zipcode FROM listings WHERE zipcode = ?`,
    zipcode
  );
  res.json(listings);
});

// Start server and create tables
const startServer = async () => {
  const db = await dbPromise;

  await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `);

  await db.run(`
    CREATE TABLE IF NOT EXISTS listings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      booking_name TEXT,
      location TEXT,
      number_of_bookings INTEGER,
      zipcode TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
