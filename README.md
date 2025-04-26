# HomeNest

This is a full-stack Travel Booking Web Application built with:

- Frontend: React.js + TailwindCSS + @dnd-kit/core (Drag and Drop)
- Backend: Node.js + Express.js
- Database: SQLite3
- Styling: TailwindCSS (customized components)
- User Management: Custom authentication system (username + password)
- State Management: LocalStorage and React hooks (no Redux)

Users can sign up or log in, manage their own travel listings, and customers can book travel listings while filtering by zip code.

---

## Features
- Login and Register (with username and password)
- Each user has their own listings (travel bookings)
- Drag and Drop dashboard to reorder boxes
- Add new bookings dynamically (with input prompts or modal)
- Booking system (customers click a listing to book it)
- Zip Code Filter (search destinations)
- Owner Information (shows who posted each destination)
- Booking Counter (shows how many bookings a destination has)

---

## Technologies Used

| Frontend | Backend | Database | Styling |
|:---|:---|:---|:---|
| React.js | Node.js (Express) | SQLite3 | TailwindCSS |
| @dnd-kit/core | CORS | SQLite for persistence | Gradient + Glassmorphism Effects |
| @dnd-kit/sortable | Body Parser (via express.json) | SQL JOINs for user listings | Custom Responsive Design |

---

## How to Run the Project

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/travel-booking-app.git
cd travel-booking-app
```

### 2. Backend Setup (Node + Express)
```bash
npm install express sqlite3 cors
```

This will install:
- Express.js (backend server)
- SQLite3 (database)
- CORS (Cross-Origin Resource Sharing)

### 3. Frontend Setup (React)
```bash
npm install
```

This will install:
- React
- @dnd-kit/core and @dnd-kit/sortable (for drag & drop)
- TailwindCSS
- React Router DOM (if used)

### 4. Start the Backend Server
```bash
node server.js
```

This will:
- Create a SQLite database (`users.db`) if it doesn’t exist.
- Create `users` and `listings` tables automatically.
- Start the server at: `http://localhost:3001`

### 5. Start the Frontend Server
```bash
npm run dev
# or
npm start
```

This will:
- Launch the frontend React app at `http://localhost:3000`

---

## Important Notes
- Make sure backend is running on port **3001**.
- Frontend is running on port **3000**.
- CORS is handled in the backend using `cors()`.
- SQLite database is created locally as `users.db` in the root.
- All user listings are separate and linked via SQL `user_id`.

---

## Author
- Built during hands-on development practice focusing on full-stack web applications.

Enjoy traveling the world! ✨🚀
