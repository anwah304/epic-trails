# Epic Trails

> Discover the most beautiful hiking trails in the Sultanate of Oman.

Epic Trails is a full-stack web platform for exploring hiking trails across all 11 governorates of Oman. Visitors can browse trails by location or difficulty, see each trail on a map, meet local hiking guides, and check the weather. Admins manage all trails and guides through a dedicated dashboard.

<!-- Add screenshots here, e.g.
![Home](screenshots/home.png)
![Admin Dashboard](screenshots/admin.png)
-->

## Features

### For hikers
- **Browse by governorate** with a live trail count for each of Oman's 11 governorates
- **Search by difficulty** (Easy, Medium, Hard)
- **Trail details** with description, difficulty badge and an embedded Google Map
- **Hiking guides** with specialty and contact details
- **Weather page** for the governorates
- **Register and login** with hashed passwords
- **Profile page** with avatar based on gender, plus trail statistics
- **Guest mode** to browse the site without an account
- **Smooth animations**: scroll reveal, animated counters, floating elements

### For admins
- **Dashboard** with live statistics: total trails, guides, registered users and logged-in users
- **Full CRUD** for trails and guides (add, edit, delete with confirmation)
- **Login tracking** (last login and login count per user)

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React, Vite, Redux Toolkit, React Router, reactstrap, React Hook Form, Yup, Axios, React Icons |
| **Backend** | Node.js, Express, Mongoose, bcrypt, CORS, dotenv |
| **Database** | MongoDB Atlas |
| **Design** | Custom CSS with design tokens, Playfair Display and Montserrat fonts |

## Project Structure

```
epic-trails/
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── assets/          # images and logo
│       ├── components/      # pages and UI components
│       ├── features/        # Redux slices (User, Trail, Guide)
│       ├── style/           # CSS files
│       ├── validations/     # Yup schemas
│       ├── App.jsx
│       └── store.js
└── server/                  # Express backend
    ├── models/              # Mongoose models (Users, Trails, Guides)
    └── index.js             # API routes
```

## Getting Started

### Prerequisites
- Node.js 18 or later
- A MongoDB database (a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster works)

### 1. Clone the repository
```bash
git clone https://github.com/anwah304/epic-trails.git
cd epic-trails
```

### 2. Run the server
```bash
cd server
npm install
```
Create a `.env` file inside `server/`:
```
MONGO_URI=your_mongodb_connection_string
```
Then start it:
```bash
node index.js
```
The API runs on `http://localhost:3004`.

### 3. Run the client
Open a second terminal:
```bash
cd client
npm install
npm run dev
```
The app runs on `http://localhost:5173`.

### 4. Create an admin account
Register a normal account from the app, then change its `role` field from `"user"` to `"admin"` in your MongoDB collection. Logging in with it opens the admin dashboard.

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Create an account |
| POST | `/login` | Sign in |
| GET | `/usersCount` | Registered and logged-in user counts |
| GET | `/getTrails` | List all trails |
| POST | `/addTrail` | Add a trail |
| PUT | `/editTrail/:id` | Update a trail |
| DELETE | `/deleteTrail/:id` | Delete a trail |
| GET | `/getGuides` | List all guides |
| POST | `/addGuide` | Add a guide |
| PUT | `/editGuide/:id` | Update a guide |
| DELETE | `/deleteGuide/:id` | Delete a guide |

## Roadmap
- Protect admin routes (role check on both client and server)
- Live weather data from a weather API
- Favorite trails for each user
- Deploy the app online

## Team

Designed and developed by **Anwah Ibrahim AL-Sinani**.








