# 🚀 SafeRoute Project

A full-stack mobile application with React Native frontend and Node.js/Express backend.

## 📁 Project Structure

```
Safe-Route/
├── backend/                 # Node.js Express API server
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Helper functions
│   │   ├── config/         # Configuration files
│   │   └── server.js       # Server entry point
│   └── package.json
│
└── SafeRoute-frontend/     # React Native mobile app
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── screens/        # App screens
    │   ├── navigation/     # Navigation setup
    │   ├── services/       # API calls
    │   ├── utils/          # Helper functions
    │   ├── constants/      # App constants
    │   ├── hooks/          # Custom hooks
    │   ├── context/        # Global state
    │   └── assets/         # Images, fonts, etc.
    ├── android/            # Android specific code
    ├── ios/                # iOS specific code
    └── package.json
```

## 🎯 What Is This Project?

SafeRoute is a **MERN-style full-stack mobile application** where:

- **Frontend**: React Native mobile app (similar to React web, but for iOS/Android)
- **Backend**: Node.js + Express + MongoDB (just like MERN stack)

Think of it as your MERN projects, but the frontend is a mobile app instead of a website!

## 🚦 Quick Start Guide

### Prerequisites

Before you start, make sure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas)
- **Android Studio** (for Android development)
- **Xcode** (for iOS development - Mac only)
- **React Native environment setup** - Follow [official guide](https://reactnative.dev/docs/set-up-your-environment)

### 1️⃣ Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create environment file from example
cp .env.example .env

# Edit .env file and add your MongoDB URI and other configs
# Example:
# MONGODB_URI=mongodb://localhost:27017/saferoute
# PORT=5000

# Start the development server
npm run dev

# Server should be running on http://localhost:5000
```

### 2️⃣ Frontend Setup

```bash
# Navigate to frontend folder
cd SafeRoute-frontend

# Install dependencies
npm install

# For iOS (Mac only), install pods
cd ios && pod install && cd ..

# Start Metro bundler
npm start

# In a new terminal, run the app:
# For Android:
npm run android

# For iOS (Mac only):
npm run ios
```

## 📚 Documentation

### For Backend Developers

Check out [backend/README.md](backend/README.md) for:

- Detailed folder structure explanation
- How to create models, controllers, routes
- API development patterns
- Common backend tasks

### For Frontend Developers

Check out [SafeRoute-frontend/README.md](SafeRoute-frontend/README.md) for:

- React Native folder structure
- How to create screens and components
- Navigation setup
- API integration
- React Native vs React web differences

## 🔄 Development Workflow

### Adding a New Feature (Full Stack)

#### 1. Backend (API)

```bash
cd backend

# Create model (e.g., Route.model.js)
# Create controller (e.g., route.controller.js)
# Create routes (e.g., route.routes.js)
# Add route to server.js

# Test API with Postman/Thunder Client
```

#### 2. Frontend (React Native)

```bash
cd SafeRoute-frontend

# Create service to call API (e.g., src/services/route.service.js)
# Create screen (e.g., src/screens/RouteScreen.jsx)
# Add screen to navigation
# Use service in screen to fetch/send data
```

### Example Flow: Adding "Routes" Feature

**Backend (`backend/src/`):**

1. `models/Route.model.js` - Define route schema
2. `controllers/route.controller.js` - Handle requests
3. `routes/route.routes.js` - Define endpoints
4. `server.js` - Import and use routes

**Frontend (`SafeRoute-frontend/src/`):**

1. `services/route.service.ts` - API calls to backend
2. `screens/RoutesListScreen.tsx` - Display routes
3. `screens/CreateRouteScreen.tsx` - Create new route
4. `navigation/AppNavigator.tsx` - Add new screens

## 🤝 Team Collaboration Tips

### Git Workflow

```bash
# Always pull before starting work
git pull origin main

# Create a feature branch
git checkout -b feature/add-user-profile

# Make your changes...

# Commit with clear messages
git add .
git commit -m "Add user profile screen with edit functionality"

# Push your branch
git push origin feature/add-user-profile

# Create Pull Request on GitHub
```

### Branch Naming Convention

- `feature/description` - New features
- `fix/description` - Bug fixes
- `update/description` - Updates to existing features

### Commit Message Guidelines

- ✅ Good: "Add login screen with form validation"
- ✅ Good: "Fix crash when loading user profile"
- ❌ Bad: "update"
- ❌ Bad: "changes"

## 🔧 Common Commands

### Backend

```bash
cd backend
npm install              # Install dependencies
npm run dev             # Start development server
npm start               # Start production server
```

### Frontend

```bash
cd SafeRoute-frontend
npm install             # Install dependencies
npm start               # Start Metro bundler
npm run android         # Run on Android
npm run ios             # Run on iOS (Mac only)
```

## 📱 Testing Your API from Mobile App

When testing the app on a physical device or emulator, you can't use `localhost` from the mobile app.

### From Android Emulator:

```typescript
// Use this in your API service
const API_URL = "http://10.0.2.2:5000/api";
```

### From Physical Device:

```typescript
// Use your computer's IP address
const API_URL = "http://192.168.1.100:5000/api"; // Replace with your IP
```

### To find your computer's IP:

**Windows:**

```bash
ipconfig
# Look for IPv4 Address
```

**Mac/Linux:**

```bash
ifconfig
# Look for inet under your network interface
```

## 🐛 Troubleshooting

### Backend Issues

**Problem:** Can't connect to MongoDB  
**Solution:**

- Make sure MongoDB is running
- Check MONGODB_URI in `.env` file
- For MongoDB Atlas, check network access settings

**Problem:** Port already in use  
**Solution:** Change PORT in `.env` or kill the process using that port

### Frontend Issues

**Problem:** Metro bundler not running  
**Solution:** Run `npm start` in SafeRoute-frontend directory

**Problem:** Android build failed  
**Solution:**

```bash
cd android
./gradlew clean
cd ..
npm run android
```

**Problem:** Can't fetch data from backend  
**Solution:**

- Check if backend is running
- Use correct IP address (not localhost for devices)
- Check CORS settings in backend

## 📖 Learning Resources

### For MERN Developers New to React Native

- [React Native Express](https://www.reactnative.express/) - Best for React developers
- [React Navigation](https://reactnavigation.org/) - Essential for app navigation
- [React Native Docs](https://reactnative.dev/) - Official documentation

### For Backend

- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)
- [MongoDB University](https://university.mongodb.com/) - Free courses

## 🎓 Key Differences from MERN Web

| Aspect   | MERN Web                       | This Project                      |
| -------- | ------------------------------ | --------------------------------- |
| Frontend | React (web)                    | React Native (mobile)             |
| Styling  | CSS files                      | StyleSheet API                    |
| Routing  | React Router                   | React Navigation                  |
| Storage  | localStorage                   | AsyncStorage                      |
| Elements | HTML (`<div>`, `<p>`)          | React Native (`<View>`, `<Text>`) |
| Backend  | Same! Node + Express + MongoDB | Same! Node + Express + MongoDB    |

## 👥 Team Members Guide

### I want to work on...

**Frontend (Mobile App):**

- Work in `SafeRoute-frontend/` folder
- See [SafeRoute-frontend/README.md](SafeRoute-frontend/README.md)
- Knowledge needed: React basics, JavaScript/TypeScript
- You'll create screens, components, and handle UI

**Backend (API Server):**

- Work in `backend/` folder
- See [backend/README.md](backend/README.md)
- Knowledge needed: Node.js, Express, MongoDB
- You'll create APIs, handle database, business logic

**Full Stack:**

- Work on both!
- Create backend API first, then consume it in frontend
- Perfect for learning the complete flow

## 🚀 Next Steps

1. **Read this README** - You're already doing it! ✅
2. **Set up your development environment** - Follow Quick Start Guide
3. **Explore the code structure** - Check out both READMEs
4. **Try running the project** - Start backend and frontend
5. **Make a small change** - Edit App.jsx and see it update!
6. **Ask questions** - Don't hesitate to ask team members

## 📞 Getting Help

- Check the specific README files in `backend/` and `SafeRoute-frontend/`
- Google the error messages (they're usually helpful!)
- Ask your team members
- Check React Native and Express.js documentation

---

**Happy Coding! 🎉**

Remember: This is just like MERN stack - the only difference is the frontend is a mobile app instead of a website!
