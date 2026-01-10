# ✅ SafeRoute Authentication Setup Checklist

Use this checklist to track your setup progress.

## 📦 Step 1: Install Dependencies

- [ ] Navigate to SafeRoute-frontend directory
- [ ] Run installation script:
  - [ ] Windows: `.\install-dependencies.bat`
  - [ ] Mac/Linux: `./install-dependencies.sh`
- [ ] For iOS: Run `cd ios && pod install && cd ..`
- [ ] Verify no installation errors

## 🔥 Step 2: Firebase Console Setup

### Create/Select Project
- [ ] Go to [Firebase Console](https://console.firebase.google.com/)
- [ ] Create new project OR select existing
- [ ] Project created successfully

### Enable Authentication
- [ ] Click "Authentication" in sidebar
- [ ] Click "Get started"
- [ ] Go to "Sign-in method" tab
- [ ] Enable "Email/Password" provider
- [ ] Enable "Google" provider
- [ ] Enter project support email for Google

### Add Android App
- [ ] Go to Project Settings
- [ ] Click Android icon
- [ ] Enter package name: `com.saferoute`
- [ ] Get SHA-1 fingerprint: `cd android && ./gradlew signingReport`
- [ ] Copy debug SHA-1 and paste in Firebase
- [ ] Download `google-services.json`
- [ ] Place file in: `android/app/google-services.json`
- [ ] Verify file is in correct location

### Add iOS App
- [ ] In Project Settings, click iOS icon
- [ ] Enter bundle ID: `com.saferoute`
- [ ] Download `GoogleService-Info.plist`
- [ ] Open Xcode: `open ios/SafeRoute.xcworkspace`
- [ ] Drag plist file to project (check "Copy items if needed")
- [ ] Verify file is added in Xcode

### Get Web Client ID
- [ ] Go to Authentication > Sign-in method
- [ ] Click on Google provider
- [ ] Expand "Web SDK configuration"
- [ ] Copy the Web client ID
- [ ] Save it somewhere (you'll need it next)

## 🔧 Step 3: Configure Code

### Update Firebase Config
- [ ] Open `src/config/firebase.config.js`
- [ ] Replace `YOUR_WEB_CLIENT_ID_HERE` with actual Web Client ID
- [ ] Save file

### Update Firebase Service
- [ ] Open `src/services/firebase.service.js`
- [ ] Find line 22 (GoogleSignin.configure)
- [ ] Replace `YOUR_WEB_CLIENT_ID_HERE` with actual Web Client ID
- [ ] Save file

## 💾 Step 4: Set Up Firestore Database

- [ ] In Firebase Console, click "Firestore Database"
- [ ] Click "Create database"
- [ ] Select "Start in test mode"
- [ ] Choose location closest to users
- [ ] Click "Enable"
- [ ] Database created successfully

### Configure Security Rules
- [ ] Go to Firestore Database > Rules
- [ ] Copy rules from `FIREBASE_SETUP.md`
- [ ] Paste and publish rules

## 🔒 Step 5: Verify Permissions

### Android
- [ ] Open `android/app/src/main/AndroidManifest.xml`
- [ ] Verify location permissions present
- [ ] Verify SMS permissions present
- [ ] Verify phone permissions present
- [ ] Verify contacts permissions present
- [ ] Verify microphone permissions present

### iOS
- [ ] Open `ios/SafeRoute/Info.plist`
- [ ] Verify NSLocationWhenInUseUsageDescription
- [ ] Verify NSContactsUsageDescription
- [ ] Verify NSMicrophoneUsageDescription
- [ ] All descriptions are meaningful

## 🎯 Step 6: Test Build

### Android
- [ ] Connect Android device or start emulator
- [ ] Run: `npm run android`
- [ ] App builds successfully
- [ ] App launches without crashes

### iOS (if on Mac)
- [ ] Connect iOS device or start simulator
- [ ] Run: `npm run ios`
- [ ] App builds successfully
- [ ] App launches without crashes

## 🧪 Step 7: Test Features

### Sign Up Flow
- [ ] Open app and navigate to SignUp
- [ ] Test phone number validation (10 digits)
- [ ] Test email validation
- [ ] Test password validation (8 chars, uppercase, lowercase, number)
- [ ] Test confirm password matching
- [ ] Test form submission
- [ ] Verify account created in Firebase Console
- [ ] Verify permissions are requested after signup

### Login Flow
- [ ] Navigate to Login screen
- [ ] Test login with email and password
- [ ] Test "Forgot Password" functionality
- [ ] Verify email received for password reset
- [ ] Test login success

### Google Sign-In
- [ ] Click "Continue with Google" on SignUp
- [ ] Google Sign-In modal appears
- [ ] Select Google account
- [ ] Sign in successful
- [ ] User appears in Firebase Console

### Error Handling
- [ ] Try signup with existing email (should show error)
- [ ] Try login with wrong password (should show error)
- [ ] Try signup with weak password (should show error)
- [ ] All errors display properly

## 📱 Step 8: Verify Permissions

### After Signup
- [ ] Location permission requested
- [ ] SMS permission requested
- [ ] Phone permission requested
- [ ] Contacts permission requested
- [ ] Microphone permission requested
- [ ] Permission dialogs show proper messages

## 🔍 Step 9: Check Firebase Console

- [ ] Go to Authentication > Users
- [ ] See test users you created
- [ ] Go to Firestore Database
- [ ] See `users` collection
- [ ] See user documents with email, phone data

## 📚 Step 10: Review Documentation

- [ ] Read `SETUP_INSTRUCTIONS.md`
- [ ] Read `AUTH_README.md`
- [ ] Read `FIREBASE_SETUP.md`
- [ ] Read `src/screens/Auth/README.md`
- [ ] Understand component usage
- [ ] Understand integration approach

## 🔗 Step 11: Plan Integration

- [ ] Decide where auth fits in app flow
- [ ] Plan navigation structure
- [ ] Decide on initial route
- [ ] Plan auth state management
- [ ] Coordinate with team members

## 🎨 Step 12: Customize (Optional)

- [ ] Review color theme in `src/constants/index.js`
- [ ] Adjust colors if needed
- [ ] Modify validation rules if needed
- [ ] Add additional fields if needed
- [ ] Customize permission messages if needed

## 🚀 Step 13: Production Preparation (Future)

- [ ] Generate release keystore for Android
- [ ] Add release SHA-1 to Firebase
- [ ] Update Firestore security rules for production
- [ ] Enable email verification requirement
- [ ] Set up Firebase App Check
- [ ] Configure rate limiting
- [ ] Set up monitoring/analytics
- [ ] Test on multiple devices
- [ ] Prepare privacy policy
- [ ] Prepare terms of service

## ✅ Final Checks

- [ ] No console errors
- [ ] No build warnings
- [ ] All features working
- [ ] Team members informed
- [ ] Documentation read
- [ ] Firebase configured correctly
- [ ] Ready for integration!

---

## 📊 Progress Tracker

Total Items: ~90
- [ ] 0-30: Just getting started
- [ ] 31-60: Making good progress
- [ ] 61-80: Almost there!
- [ ] 81-90: Ready to go! 🎉

---

## 🆘 Troubleshooting

If you get stuck:

1. ❌ **Build errors**: Check `FIREBASE_SETUP.md` troubleshooting section
2. ❌ **Firebase errors**: Verify `google-services.json` and plist files
3. ❌ **Google Sign-In fails**: Check Web Client ID configuration
4. ❌ **Permissions not working**: Uninstall app and reinstall
5. ❌ **Navigation errors**: Review `AUTH_README.md` integration section

---

## 🎯 Minimum Viable Test

To quickly verify everything works:

✅ **Must Work:**
1. App builds and runs
2. Can sign up with email/password
3. User appears in Firebase Console
4. Can log in with created account

✅ **Should Work:**
5. Google Sign-In works
6. Permissions are requested
7. Password reset email sent

✅ **Nice to Have:**
8. All validations working correctly
9. Error messages display properly
10. Navigation between screens works

---

**Print this checklist and check items off as you complete them! 📋✅**

Good luck! 🚀


