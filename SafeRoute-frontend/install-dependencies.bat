@echo off
REM SafeRoute - Install Dependencies Script (Windows)
REM This script installs all required dependencies for the authentication system

echo 🚀 Installing SafeRoute Authentication Dependencies...
echo.

REM Check if we're in the right directory
if not exist package.json (
    echo ❌ Error: package.json not found. Please run this script from the SafeRoute-frontend directory.
    exit /b 1
)

echo 📦 Installing npm packages...
call npm install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore @react-native-google-signin/google-signin react-native-permissions @react-navigation/native @react-navigation/stack react-native-gesture-handler react-native-reanimated

echo.
echo ✅ npm packages installed successfully!
echo.

echo 📝 Next Steps:
echo.
echo 1. Set up Firebase project following FIREBASE_SETUP.md
echo 2. Download and place configuration files:
echo    - Android: google-services.json → android/app/
echo    - iOS: GoogleService-Info.plist → ios/ (via Xcode)
echo 3. Update firebase.config.js with your Web Client ID
echo 4. Run the app:
echo    - Android: npm run android
echo.
echo 🎉 Installation complete!
echo.
echo 📚 For detailed setup instructions, see FIREBASE_SETUP.md
echo.

pause


