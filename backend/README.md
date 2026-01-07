# SafeRoute Backend

## 📁 Folder Structure Explained

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Handle requests and responses
│   ├── models/          # Database schemas (MongoDB models)
│   ├── routes/          # API route definitions
│   ├── middleware/      # Custom middleware functions
│   ├── services/        # Business logic and reusable functions
│   ├── utils/           # Helper/utility functions
│   └── server.js        # Main entry point of the app
├── .env.example         # Example environment variables
├── .gitignore          # Files to ignore in git
└── package.json        # Dependencies and scripts
```

## 🎯 What Goes Where? (Simple Explanation)

### 📂 **controllers/** - Request Handlers

**What it is:** Functions that handle what happens when someone visits a URL  
**When to use:** When you need to define what happens for each API endpoint  
**Example:**

```javascript
// user.controller.js - Handles all user-related requests
exports.getAllUsers = async (req, res) => {
  // Get users from database and send response
};
```

### 📂 **models/** - Database Schemas

**What it is:** Defines the structure of your data in MongoDB (like a template)  
**When to use:** When you need to create a new type of data in your database  
**Example:**

```javascript
// User.model.js - Defines what a User looks like
const userSchema = {
  name: String,
  email: String,
  password: String,
};
```

**Similar to:** Creating a table structure in SQL, but for MongoDB

### 📂 **routes/** - URL Paths

**What it is:** Connects URLs to controller functions  
**When to use:** When you want to create new API endpoints  
**Example:**

```javascript
// user.routes.js
router.get("/users", getAllUsers); // GET /api/users
router.post("/users", createUser); // POST /api/users
router.put("/users/:id", updateUser); // PUT /api/users/123
router.delete("/users/:id", deleteUser); // DELETE /api/users/123
```

### 📂 **middleware/** - In-Between Functions

**What it is:** Code that runs BEFORE your controller handles the request  
**When to use:** For authentication, logging, validation, etc.  
**Example:**

```javascript
// auth.middleware.js - Check if user is logged in
const authMiddleware = (req, res, next) => {
  // Check if user has valid token
  if (noToken) return res.status(401).json({ error: "Not authorized" });
  next(); // Continue to controller
};
```

**Think of it as:** A security guard that checks things before letting the request through

### 📂 **services/** - Business Logic

**What it is:** Reusable functions that do specific tasks  
**When to use:** When you have complex logic that multiple controllers might use  
**Example:**

```javascript
// location.service.js
calculateDistance(lat1, lon1, lat2, lon2) {
  // Complex math to calculate distance
  return distance;
}
```

**Similar to:** Utility functions in React, but for backend logic

### 📂 **utils/** - Helper Functions

**What it is:** Small, simple helper functions used across the app  
**When to use:** For formatting, validation, simple calculations  
**Example:**

```javascript
// helpers.js
exports.formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

exports.isValidEmail = (email) => {
  return emailRegex.test(email);
};
```

### 📂 **config/** - Configuration

**What it is:** Settings and configurations (database connection, API keys, etc.)  
**When to use:** For database setup, third-party API configurations  
**Example:**

```javascript
// database.js - Connects to MongoDB
const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
};
```

### 📄 **server.js** - Main File

**What it is:** The starting point of your backend app  
**What it does:**

- Starts the Express server
- Connects to database
- Sets up middleware
- Imports all routes

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up Environment Variables

```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your values
# For example:
# MONGODB_URI=mongodb://localhost:27017/saferoute
# PORT=5000
```

### 3. Run the Server

```bash
# Development mode (auto-restarts on changes)
npm run dev

# Production mode
npm start
```

## 📝 How to Add New Features

### Adding a New Model (e.g., "Route")

1. Create `src/models/Route.model.js`
2. Define the schema:

```javascript
const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  startLocation: String,
  endLocation: String,
  distance: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Route", routeSchema);
```

### Adding a New Controller

1. Create `src/controllers/route.controller.js`
2. Add functions to handle requests:

```javascript
const Route = require("../models/Route.model");

exports.getAllRoutes = async (req, res) => {
  const routes = await Route.find();
  res.json(routes);
};

exports.createRoute = async (req, res) => {
  const route = new Route(req.body);
  await route.save();
  res.status(201).json(route);
};
```

### Adding Routes

1. Create `src/routes/route.routes.js`
2. Connect URLs to controllers:

```javascript
const express = require("express");
const router = express.Router();
const routeController = require("../controllers/route.controller");

router.get("/", routeController.getAllRoutes);
router.post("/", routeController.createRoute);

module.exports = router;
```

3. **Import in server.js:**

```javascript
const routeRoutes = require("./routes/route.routes");
app.use("/api/routes", routeRoutes);
```

## 🔑 Common Patterns

### API Endpoint Structure

```
GET    /api/users        → Get all users
GET    /api/users/:id    → Get one user by ID
POST   /api/users        → Create new user
PUT    /api/users/:id    → Update user
DELETE /api/users/:id    → Delete user
```

### Response Format

```javascript
// Success
res.status(200).json({ data: users });

// Created
res.status(201).json({ message: "User created", data: user });

// Error
res.status(404).json({ error: "User not found" });
res.status(500).json({ error: "Server error" });
```

## 🛠️ Common Commands

```bash
# Install new package
npm install package-name

# Install dev dependency
npm install --save-dev package-name

# Check for errors
npm run lint

# Run tests (when you add them)
npm test
```

## 📚 Useful Packages You Might Need

```bash
# Authentication
npm install jsonwebtoken bcryptjs

# Validation
npm install joi

# File upload
npm install multer

# Logging
npm install morgan

# Security
npm install helmet express-rate-limit
```

## 🤝 Tips for Team Collaboration

1. **Always pull before starting work:** `git pull origin main`
2. **Use meaningful commit messages:** "Add user authentication" not "update"
3. **Test your endpoints:** Use Postman or Thunder Client
4. **Don't commit .env file:** It's in .gitignore for security
5. **Follow the folder structure:** Keep controllers in controllers, models in models, etc.

## 🐛 Common Issues & Solutions

**Problem:** "Cannot connect to MongoDB"  
**Solution:** Make sure MongoDB is running and MONGODB_URI in .env is correct

**Problem:** "Port already in use"  
**Solution:** Change PORT in .env or stop the other process using that port

**Problem:** "Module not found"  
**Solution:** Run `npm install` to install all dependencies

## 📖 Learn More

- [Express.js Docs](https://expressjs.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [Node.js Docs](https://nodejs.org/)
