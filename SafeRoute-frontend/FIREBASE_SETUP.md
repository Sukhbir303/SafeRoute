# Firebase Setup Guide for SafeRoute

This guide will help you set up Firebase Authentication for the SafeRoute app.

## 📋 Prerequisites

- Node.js installed
- React Native development environment set up
- A Firebase account (free)

## 🔥 Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Enter project name: `SafeRoute` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

## 🔐 Step 2: Enable Authentication Methods

1. In Firebase Console, click on "Authentication" in the left sidebar
2. Click "Get started" if it's your first time
3. Go to "Sign-in method" tab
4. Enable the following providers:
   - **Email/Password**: Click on it, toggle "Enable", and save
   - **Google**: Click on it, toggle "Enable", enter project support email, and save

## 📱 Step 3: Add Android App to Firebase

1. In Firebase Console, click the gear icon ⚙️ next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps" section
4. Click on the Android icon to add an Android app
5. Enter the following details:
   - **Android package name**: `com.saferoute` (or your app's package name from `android/app/build.gradle`)
   - **App nickname**: SafeRoute Android (optional)
   - **Debug signing certificate SHA-1**: Get it by running:
     ```bash
     cd android
     ./gradlew signingReport
     ```
     Copy the SHA-1 from the debug keystore
6. Click "Register app"
7. **Download `google-services.json`**
8. Place the file in `SafeRoute-frontend/android/app/google-services.json`
9. Click "Next" and "Continue to console"

## 🍎 Step 4: Add iOS App to Firebase

1. In Firebase Console Project Settings, scroll to "Your apps"
2. Click on the iOS icon to add an iOS app
3. Enter the following details:
   - **iOS bundle ID**: `com.saferoute` (or your app's bundle ID from `ios/SafeRoute/Info.plist`)
   - **App nickname**: SafeRoute iOS (optional)
4. Click "Register app"
5. **Download `GoogleService-Info.plist`**
6. Open Xcode:
   ```bash
   open ios/SafeRoute.xcworkspace
   ```
7. Drag the `GoogleService-Info.plist` file into the project in Xcode (make sure "Copy items if needed" is checked)
8. Click "Next" and "Continue to console"

## 🔑 Step 5: Get Web Client ID for Google Sign-In

1. In Firebase Console, go to "Authentication" > "Sign-in method"
2. Click on "Google" provider
3. Expand the "Web SDK configuration" section
4. Copy the **Web client ID**
5. Open `SafeRoute-frontend/src/config/firebase.config.js`
6. Replace `YOUR_WEB_CLIENT_ID_HERE` with your actual Web client ID

## 📦 Step 6: Install Required Packages

Navigate to the frontend directory and install the required packages:

```bash
cd SafeRoute-frontend
npm install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore @react-native-google-signin/google-signin react-native-permissions
```

### Additional iOS Setup

After installing packages, install iOS pods:

```bash
cd ios
pod install
cd ..
```

### Additional Android Setup

The packages should auto-link, but if you encounter issues:

1. Open `android/build.gradle` and ensure you have:
```gradle
buildscript {
    dependencies {
        classpath 'com.google.gms:google-services:4.3.15'
    }
}
```

2. Open `android/app/build.gradle` and add at the bottom:
```gradle
apply plugin: 'com.google.gms.google-services'
```

## 🔧 Step 7: Configure Android Permissions

Add the following permissions to `android/app/src/main/AndroidManifest.xml`:

```xml
<manifest ...>
    <!-- Existing permissions -->
    
    <!-- Internet permission (should already exist) -->
    <uses-permission android:name="android.permission.INTERNET" />
    
    <!-- Location permissions -->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    
    <!-- SMS permissions -->
    <uses-permission android:name="android.permission.SEND_SMS" />
    <uses-permission android:name="android.permission.READ_SMS" />
    
    <!-- Phone permissions -->
    <uses-permission android:name="android.permission.CALL_PHONE" />
    
    <!-- Contacts permissions -->
    <uses-permission android:name="android.permission.READ_CONTACTS" />
    
    <!-- Microphone permissions -->
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    
    <application ...>
        ...
    </application>
</manifest>
```

## 🍎 Step 8: Configure iOS Permissions

Add the following to `ios/SafeRoute/Info.plist`:

```xml
<dict>
    <!-- Existing keys -->
    
    <!-- Location permissions -->
    <key>NSLocationWhenInUseUsageDescription</key>
    <string>SafeRoute needs your location to provide safety alerts and route guidance.</string>
    <key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
    <string>SafeRoute needs your location to provide safety alerts even when the app is in the background.</string>
    
    <!-- Contacts permissions -->
    <key>NSContactsUsageDescription</key>
    <string>SafeRoute needs access to your contacts to set up emergency contacts.</string>
    
    <!-- Microphone permissions -->
    <key>NSMicrophoneUsageDescription</key>
    <string>SafeRoute needs microphone access for voice commands and emergency recording.</string>
    
    <!-- Photo Library (if needed) -->
    <key>NSPhotoLibraryUsageDescription</key>
    <string>SafeRoute needs access to your photo library to set profile pictures.</string>
    
    <!-- Camera (if needed) -->
    <key>NSCameraUsageDescription</key>
    <string>SafeRoute needs camera access to take photos for incidents.</string>
</dict>
```

## 🔥 Step 9: Configure Firestore Database

1. In Firebase Console, click on "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (we'll secure it later)
4. Select a location closest to your users
5. Click "Enable"

### Set up Firestore Security Rules

Go to "Firestore Database" > "Rules" and update with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Add more collections as needed
  }
}
```

Click "Publish" to save the rules.

## ✅ Step 10: Test the Setup

1. Run the app:

   **Android:**
   ```bash
   npm run android
   ```

   **iOS:**
   ```bash
   npm run ios
   ```

2. Try signing up with email and password
3. Try signing in with Google
4. Check Firebase Console > Authentication to see the users

## 🐛 Troubleshooting

### Android Build Issues

If you get build errors:

1. Clean the build:
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

2. Check that `google-services.json` is in the correct location
3. Make sure the package name in Firebase matches your app's package name

### iOS Build Issues

1. Clean build folder in Xcode: `Product` > `Clean Build Folder`
2. Re-install pods:
   ```bash
   cd ios
   pod deintegrate
   pod install
   cd ..
   ```
3. Check that `GoogleService-Info.plist` is added to Xcode project

### Google Sign-In Not Working

1. Ensure you have the correct Web client ID in `firebase.config.js`
2. For Android: Make sure SHA-1 fingerprint is added to Firebase
3. For iOS: Make sure URL schemes are added in Xcode

### Permission Requests Not Showing

1. Uninstall the app completely from device/emulator
2. Reinstall and try again
3. Check that permissions are added in AndroidManifest.xml (Android) or Info.plist (iOS)

## 📚 Additional Resources

- [React Native Firebase Documentation](https://rnfirebase.io/)
- [Firebase Console](https://console.firebase.google.com/)
- [Google Sign-In for React Native](https://github.com/react-native-google-signin/google-signin)
- [React Native Permissions](https://github.com/zoontek/react-native-permissions)

## 🔒 Security Best Practices

1. **Never commit** `google-services.json` or `GoogleService-Info.plist` to version control (add to .gitignore)
2. Set up proper Firestore security rules before going to production
3. Enable Firebase App Check to prevent unauthorized access
4. Regularly review Firebase Console > Authentication > Users for suspicious activity
5. Implement rate limiting for sensitive operations

## 🚀 Next Steps

After Firebase is set up:

1. Update the AuthContext to use the Firebase service
2. Add navigation guards to protect authenticated routes
3. Implement profile management features
4. Add password reset functionality
5. Set up email verification reminders

---

**Need Help?** Check the troubleshooting section or consult the Firebase documentation.


