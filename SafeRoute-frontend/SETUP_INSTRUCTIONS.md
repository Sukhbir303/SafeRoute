# 🚀 Quick Setup Instructions

Follow these steps to get the authentication system running.

## ⚡ Quick Start (5 Steps)

### 1️⃣ Install Dependencies

**Windows:**
```bash
cd SafeRoute-frontend
.\install-dependencies.bat
```

**Mac/Linux:**
```bash
cd SafeRoute-frontend
chmod +x install-dependencies.sh
./install-dependencies.sh
```

### 2️⃣ Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Enable Authentication > Email/Password and Google
4. Add Android app:
   - Package name: `com.saferoute`
   - Download `google-services.json`
   - Place in: `SafeRoute-frontend/android/app/`
5. Add iOS app:
   - Bundle ID: `com.saferoute`
   - Download `GoogleService-Info.plist`
   - Add to Xcode project in `ios/SafeRoute/`

### 3️⃣ Configure Firebase

1. Get Web Client ID from Firebase Console
2. Open `src/config/firebase.config.js`
3. Replace `YOUR_WEB_CLIENT_ID_HERE` with your actual Web Client ID
4. Also update in `src/services/firebase.service.js` (line 22)

### 4️⃣ Set up Firestore

1. In Firebase Console, go to Firestore Database
2. Click "Create database"
3. Start in test mode
4. Create and enable

### 5️⃣ Run the App

**Android:**
```bash
npm run android
```

**iOS:**
```bash
npm run ios
```

## 📖 Detailed Documentation

- **Complete Firebase Setup**: See `FIREBASE_SETUP.md`
- **Authentication System Overview**: See `AUTH_README.md`
- **Screen Documentation**: See `src/screens/Auth/README.md`

## ✅ What's Included

- ✅ SignUp Screen (phone, email, password, confirm password)
- ✅ Login Screen (email/phone, password, forgot password)
- ✅ Google Sign-In integration
- ✅ Firebase authentication
- ✅ Permission requests (Location, SMS, Phone, Contacts, Microphone)
- ✅ Reusable components (AuthInput, AuthButton, PasswordInput, SocialButton)
- ✅ Form validations
- ✅ Error handling
- ✅ Loading states
- ✅ Beautiful UI with your color theme

## 🎨 Color Theme

Your app colors have been configured in `src/constants/index.js`:
- Teal Green (#1DB9A0) - Primary actions
- Alert Red (#E63946) - Errors/danger
- Amber (#F4A261) - Warnings
- Light/Dark theme support

## 🔗 Next Steps

1. Test the auth screens
2. Integrate with your carousel/home screen
3. Set up navigation flow
4. Configure Firestore security rules (see FIREBASE_SETUP.md)

## 🆘 Need Help?

Check the troubleshooting sections in:
- `FIREBASE_SETUP.md` - Firebase issues
- `AUTH_README.md` - Integration questions

## 🎯 Testing the Screens

To quickly test the auth screens, temporarily set SignUp as initial route:

Edit `src/navigation/AppNavigator.jsx`:
```javascript
import { SignUpScreen, LoginScreen } from '../screens';

<Stack.Navigator initialRouteName="SignUp">
  <Stack.Screen 
    name="SignUp" 
    component={SignUpScreen}
    options={{ headerShown: false }}
  />
  <Stack.Screen 
    name="Login" 
    component={LoginScreen}
    options={{ headerShown: false }}
  />
</Stack.Navigator>
```

---

**That's it! You're ready to go! 🎉**

For detailed information, see the other README files in this directory.


