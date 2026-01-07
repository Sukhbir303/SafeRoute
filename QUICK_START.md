# 🚀 SafeRoute - Quick Start Guide

## ✅ Setup Complete!

Your React Native app is ready to run! Metro bundler is currently running.

---

## 📱 Commands You'll Use Every Time

### **First Time Setup** (Already Done! ✅)

```bash
cd Safe-Route/SafeRoute-frontend
npm install
```

### **Every Time You Work on the App:**

#### **Step 1: Start Metro Bundler** (JavaScript bundler)

Open a terminal and run:

```bash
cd Safe-Route/SafeRoute-frontend
npx react-native start
```

**Keep this terminal running!** Metro bundler must stay active.

---

#### **Step 2: Run Your App** (Open a NEW terminal)

**Option A: Android Emulator**

```bash
cd Safe-Route/SafeRoute-frontend
npx react-native run-android
```

**Prerequisites:**

- Android Studio installed
- Android Emulator running (AVD Manager → Start emulator)

**Option B: Android Physical Device**

```bash
cd Safe-Route/SafeRoute-frontend
npx react-native run-android
```

**Prerequisites:**

1. Enable **Developer Options** on your Android phone:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
2. Enable **USB Debugging**:
   - Go to Settings → Developer Options
   - Turn on "USB Debugging"
3. Connect phone via USB cable
4. Accept "Allow USB debugging" prompt on phone
5. Verify connection: `adb devices` (should show your device)

**Option C: iOS Simulator (Mac only)**

```bash
cd Safe-Route/SafeRoute-frontend
npx react-native run-ios
```

**Prerequisites:**

- Xcode and iOS Simulator installed

**Option D: iOS Physical Device (Mac only)**

```bash
cd Safe-Route/SafeRoute-frontend
npx react-native run-ios --device
```

**Prerequisites:**

1. Apple Developer account
2. Device registered in Xcode
3. Provisioning profile configured
4. Device connected via USB and trusted

---

## 🎯 Quick Reference

### Common Commands:

```bash
# Start Metro (JavaScript bundler) - Keep this running
npx react-native start

# Run on Android (new terminal)
npx react-native run-android

# Run on iOS (new terminal, Mac only)
npx react-native run-ios

# Clean build (if you have issues)
cd android && ./gradlew clean && cd ..

# Install new package
npm install package-name

# Backend server (separate terminal)
cd backend
npm run dev
```

### Metro Bundler Shortcuts (while Metro is running):

- **r** - Reload the app
- **d** - Open Developer Menu
- **j** - Open Chrome DevTools
- **Ctrl+C** - Stop Metro

### In the App (on device/emulator):

- **Android**: Shake device OR press Ctrl+M to open Dev Menu
- **iOS**: Shake device OR press Cmd+D to open Dev Menu

---

## 🔄 Typical Workflow

### Starting Your Day:

1. **Terminal 1** - Start Metro:

   ```bash
   cd Safe-Route/SafeRoute-frontend
   npx react-native start
   ```

2. **Terminal 2** - Run the app:

   ```bash
   cd Safe-Route/SafeRoute-frontend
   npx react-native run-android
   ```

   (First run takes longer - it builds the app)

3. **Terminal 3** - Start Backend (if needed):
   ```bash
   cd Safe-Route/backend
   npm run dev
   ```

### Making Changes:

- Edit your code in VS Code
- Save the file
- The app will **automatically reload** (Fast Refresh)
- If it doesn't reload, press **r** in Metro terminal

### Ending Your Day:

- Press **Ctrl+C** in all terminal windows
- Close the emulator/simulator

---

## ⚡ Pro Tips

1. **Fast Refresh**: When you save a file, the app automatically updates - no need to rebuild!

2. **Hot Reload Not Working?**

   - Press **r** in Metro terminal
   - Or shake device and press "Reload"

3. **Metro Port Already in Use?**

   ```bash
   npx react-native start --port 8082
   ```

4. **Android Build Errors?**

   ```bash
   cd android
   ./gradlew clean
   cd ..
   npx react-native run-android
   ```

5. **Can't Connect to Backend?**
   - Android Emulator: Use `http://10.0.2.2:5000` instead of `localhost`
   - Physical Device: Use your computer's IP (e.g., `http://192.168.1.100:5000`)

---

## 📂 Project Structure Quick Guide

```
Safe-Route/
├── SafeRoute-frontend/     👈 Your mobile app
│   ├── src/
│   │   ├── screens/        → Full page screens
│   │   ├── components/     → Reusable UI parts
│   │   ├── navigation/     → Screen routing
│   │   └── services/       → API calls
│   └── App.jsx            → Main app file
│
└── backend/               👈 Your API server
    ├── src/
    │   ├── models/         → Database schemas
    │   ├── controllers/    → Request handlers
    │   └── routes/         → API endpoints
    └── server.js          → Server entry point
```

---

## 🆘 Common Issues

**Problem**: "Metro bundler not starting"  
**Solution**: Kill any process using port 8081, then restart Metro

**Problem**: "App won't install on device"  
**Solution**: Enable USB debugging on Android device, or trust developer on iOS

**Problem**: "Red screen errors"  
**Solution**: Read the error message carefully - it usually tells you exactly what's wrong!

**Problem**: "Can't find backend API"  
**Solution**: Make sure backend is running and use correct IP address

---

## 🎉 You're All Set!

**Current Status:**
✅ Dependencies installed
✅ Metro bundler running on http://localhost:8081
✅ Ready to run on Android/iOS

**Next Steps:**

1. Open a NEW terminal
2. Run `npx react-native run-android` (or run-ios)
3. Wait for the app to build and launch
4. Start coding! 🚀

---

**Need Help?**

- Check the README files in `backend/` and `SafeRoute-frontend/`
- Error messages are usually very helpful - read them!
- Ask your team members

**Happy Coding! 🎊**
