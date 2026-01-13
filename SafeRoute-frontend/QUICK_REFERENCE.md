# 🚀 Quick Reference Card

One-page reference for the SafeRoute authentication system.

## 📖 Documentation Quick Links

| What You Need | File to Read | Time |
|---------------|--------------|------|
| 🏁 Quick Setup | `SETUP_INSTRUCTIONS.md` | 5 min |
| 📚 Full Overview | `AUTH_README.md` | 15 min |
| 🔥 Firebase Setup | `FIREBASE_SETUP.md` | 30 min |
| ✅ Setup Checklist | `CHECKLIST.md` | As needed |
| 📂 File Structure | `FILE_STRUCTURE.md` | 5 min |
| 🆕 What's New | `WHATS_NEW.md` | 10 min |

## ⚡ 5-Minute Setup

```bash
# 1. Install dependencies
cd SafeRoute-frontend
npm install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore @react-native-google-signin/google-signin react-native-permissions

# 2. iOS only
cd ios && pod install && cd ..

# 3. Set up Firebase (follow FIREBASE_SETUP.md)
# 4. Add google-services.json (Android)
# 5. Add GoogleService-Info.plist (iOS)

# 6. Run app
npm run android  # or npm run ios
```

## 🎨 Colors Quick Reference

```javascript
// Light Theme (Default)
COLORS.tealGreen    // #1DB9A0 - Primary actions
COLORS.alertRed     // #E63946 - Errors
COLORS.amber        // #F4A261 - Warnings
COLORS.lightGray    // #F0F4F8 - Backgrounds
COLORS.charcoal     // #2B344B - Text
COLORS.darkGray     // #5F6E7D - Secondary text

// Dark Theme
COLORS_DARK.primaryBlue   // #0B1C2D
COLORS_DARK.tealGreen     // #1DB9A0
COLORS_DARK.softWhite     // #F1FAEEE
```

## 📱 Screen Components

### SignUpScreen
```javascript
import { SignUpScreen } from './screens';

// Features:
// - Phone number (10 digits)
// - Email (validated)
// - Password (8+ chars, upper, lower, number)
// - Confirm password
// - Google Sign-Up
// - Auto permissions after signup
```

### LoginScreen
```javascript
import { LoginScreen } from './screens';

// Features:
// - Email or phone login
// - Password
// - Forgot password
// - Google Sign-In
```

## 🧩 Reusable Components

### AuthInput
```javascript
import { AuthInput } from './components';

<AuthInput
  label="Email"
  placeholder="Enter email"
  value={email}
  onChangeText={setEmail}
  error={emailError}
  keyboardType="email-address"
/>
```

### AuthButton
```javascript
import { AuthButton } from './components';

<AuthButton
  title="Sign Up"
  onPress={handleSignUp}
  loading={loading}
  variant="primary"  // or "secondary" or "outline"
/>
```

### PasswordInput
```javascript
import { PasswordInput } from './components';

<PasswordInput
  label="Password"
  placeholder="Create password"
  value={password}
  onChangeText={setPassword}
  showStrength={true}  // Shows strength indicator
  error={passwordError}
/>
```

### SocialButton
```javascript
import { SocialButton } from './components';

<SocialButton
  provider="google"  // or "facebook" or "apple"
  onPress={handleGoogleSignIn}
  loading={loading}
/>
```

## 🔥 Firebase Service

### Import
```javascript
import { authService } from './services/firebase.service';
```

### Sign Up
```javascript
await authService.signUp(email, password, phoneNumber);
```

### Sign In
```javascript
await authService.signIn(email, password);
```

### Google Sign-In
```javascript
await authService.signInWithGoogle();
```

### Sign Out
```javascript
await authService.signOut();
```

### Reset Password
```javascript
await authService.resetPassword(email);
```

### Get Current User
```javascript
const user = authService.getCurrentUser();
```

### Listen to Auth State
```javascript
const unsubscribe = authService.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
  } else {
    // User is signed out
  }
});

// Cleanup
return unsubscribe;
```

## 🔐 Permissions

### Request All Permissions
```javascript
import { requestPermissions } from './utils/permissions';

await requestPermissions();
// Requests: Location, SMS, Phone, Contacts, Microphone
```

### Check Specific Permission
```javascript
import { checkPermission } from './utils/permissions';

const hasLocation = await checkPermission('location');
```

### Request Single Permission
```javascript
import { requestSinglePermission } from './utils/permissions';

const granted = await requestSinglePermission('location');
```

## 📋 Validation Rules

| Field | Rule | Example |
|-------|------|---------|
| Phone | 10 digits | `1234567890` |
| Email | Valid format | `user@example.com` |
| Password | 8+ chars, Upper, Lower, Number | `SafePass123` |

## 🔧 Configuration Files

### Firebase Config
```javascript
// src/config/firebase.config.js
export const FIREBASE_CONFIG = {
  webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  // ... other config
};
```

### Google Sign-In Config
```javascript
// src/services/firebase.service.js (line 22)
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  offlineAccess: true,
});
```

## 🗺️ Navigation Integration

### Import Screens
```javascript
import { SignUpScreen, LoginScreen } from './screens';
```

### Add to Navigator
```javascript
<Stack.Navigator>
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

### Navigate
```javascript
navigation.navigate('SignUp');
navigation.navigate('Login');
```

## 🐛 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Build error | `cd android && ./gradlew clean` |
| Firebase not configured | Check google-services.json location |
| Google Sign-In fails | Verify Web Client ID |
| Permissions not showing | Uninstall and reinstall app |
| iOS pods error | `cd ios && pod deintegrate && pod install` |

## 📦 Required Files Checklist

- [x] Created by system:
  - All screen files
  - All component files
  - All service files
  - All util files
  - All documentation

- [ ] You need to add:
  - `android/app/google-services.json`
  - `ios/SafeRoute/GoogleService-Info.plist`
  - Update Web Client ID in code

## 🎯 Testing Checklist

- [ ] App builds successfully
- [ ] Sign up works
- [ ] Login works
- [ ] Google Sign-In works
- [ ] Forgot password sends email
- [ ] Permissions are requested
- [ ] Validations work correctly
- [ ] Errors display properly

## 📞 Help Resources

| Problem | Resource |
|---------|----------|
| Setup issues | `SETUP_INSTRUCTIONS.md` |
| Firebase issues | `FIREBASE_SETUP.md` |
| Integration questions | `AUTH_README.md` |
| Component usage | `src/screens/Auth/README.md` |
| File locations | `FILE_STRUCTURE.md` |

## 🔑 Important Constants

```javascript
// Package name (Android)
com.saferoute

// Bundle ID (iOS)
com.saferoute

// Firebase collection
users

// Permission types
location, sms, phone, contacts, microphone
```

## 💡 Pro Tips

1. **Always** read `SETUP_INSTRUCTIONS.md` first
2. **Don't skip** Firebase setup steps
3. **Test on device** for permissions
4. **Check console** for detailed errors
5. **Use components** for consistency
6. **Follow validation** rules strictly
7. **Keep credentials** secure
8. **Update .gitignore** before committing

## 🚀 Next Steps After Setup

1. ✅ Complete Firebase setup
2. ✅ Test all features
3. ✅ Verify permissions work
4. ✅ Check Firebase Console for users
5. 🔄 Integrate with main navigation
6. 🔄 Connect to home screen
7. 🔄 Add to carousel flow
8. 🔄 Implement auth state management

## 📊 System Overview

```
User Opens App
      ↓
  Carousel (Team)
      ↓
   SignUp/Login (Ready ✅)
      ↓
Request Permissions (Auto)
      ↓
   Home Screen (Team)
```

## 🎨 Component Hierarchy

```
SignUpScreen
├── AuthInput (Phone)
├── AuthInput (Email)
├── PasswordInput (Password + strength)
├── PasswordInput (Confirm)
├── AuthButton (Sign Up)
└── SocialButton (Google)

LoginScreen
├── AuthInput (Email/Phone)
├── PasswordInput (Password)
├── AuthButton (Login)
└── SocialButton (Google)
```

---

**Bookmark this page for quick reference! 🔖**

Print it out or keep it open while developing! 📄


