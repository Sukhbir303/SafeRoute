# Authentication Screens

This folder contains all authentication-related screens for SafeRoute.

## 📁 Files

### SignUpScreen.jsx
Complete user registration screen with:
- Phone number input (10-digit validation)
- Email input (email format validation)
- Password input (strength validation)
- Confirm password input (match validation)
- Google Sign-Up option
- Auto-permission requests after successful signup

**Features:**
- Real-time form validation
- Password strength requirements (min 8 chars, uppercase, lowercase, number)
- Loading states during signup
- Error handling and user feedback
- Automatic permission requests after signup

### LoginScreen.jsx
User login screen with:
- Email or phone number input
- Password input
- Forgot password functionality
- Google Sign-In option

**Features:**
- Flexible login (email or phone)
- Password reset via email
- Remember me functionality (can be added)
- Biometric authentication support (can be added)

## 🎨 Design

Both screens follow the SafeRoute color palette:
- **Primary Action**: Teal Green (#1DB9A0)
- **Background**: Light Gray (#F0F4F8) for light theme
- **Text**: Charcoal (#2B344B) for light theme
- **Error States**: Alert Red (#E63946)
- **Input Fields**: Soft rounded corners (12px)
- **Shadows**: Subtle elevation for buttons

## 🔐 Security Features

1. **Password Requirements:**
   - Minimum 8 characters
   - At least 1 uppercase letter
   - At least 1 lowercase letter
   - At least 1 number

2. **Email Validation:**
   - Standard email format check
   - Duplicate email prevention (Firebase)

3. **Phone Validation:**
   - 10-digit number format
   - No special characters allowed

4. **Error Handling:**
   - Clear error messages
   - Field-specific validation
   - Network error handling

## 📱 Post-Signup Flow

After successful signup, the app automatically requests the following permissions:
1. **Location** - For safety alerts and route guidance
2. **SMS** - For emergency SMS to contacts
3. **Phone** - For emergency calls
4. **Contacts** - For setting up emergency contacts
5. **Microphone** - For voice commands and emergency recording

## 🔗 Navigation

The screens are designed to be standalone and will be integrated with the main navigation later.

**Expected Navigation Flow:**
```
App Start → Carousel → SignUp/Login → Home
```

**Current Implementation:**
- SignUp ↔ Login (can switch between screens)
- After auth success → Alert (will navigate to Home later)

## 🚀 Usage

### Importing the screens:
```javascript
import { SignUpScreen, LoginScreen } from '../screens';
```

### Adding to navigation:
```javascript
<Stack.Screen name="SignUp" component={SignUpScreen} />
<Stack.Screen name="Login" component={LoginScreen} />
```

### Navigating to screens:
```javascript
navigation.navigate('SignUp');
navigation.navigate('Login');
```

## 🔧 Customization

### Changing Colors:
Edit `src/constants/index.js` to update the color palette.

### Adding More Fields:
1. Add field to component state
2. Add validation function
3. Add input component
4. Update form validation
5. Update Firebase service call

### Adding More Social Login Options:
1. Set up provider in Firebase Console
2. Add provider configuration in `firebase.service.js`
3. Add button to UI with appropriate handler

## 🐛 Known Issues

None currently. Report issues to the team.

## 📚 Dependencies

- `@react-native-firebase/auth` - Firebase Authentication
- `@react-native-firebase/firestore` - User data storage
- `@react-native-google-signin/google-signin` - Google authentication
- `react-native-permissions` - Permission handling

## 🔮 Future Enhancements

1. **Biometric Authentication:**
   - Fingerprint
   - Face ID

2. **Phone Number Verification:**
   - OTP via SMS
   - Phone number authentication

3. **Remember Me:**
   - Persistent login
   - Secure token storage

4. **Profile Completion:**
   - Name, photo after signup
   - Emergency contacts setup
   - Preferences configuration

5. **Email Verification:**
   - Verify email before full access
   - Resend verification email

6. **Two-Factor Authentication:**
   - Optional 2FA setup
   - SMS or app-based authentication

## 🔒 Security Best Practices

1. Never log sensitive information (passwords, tokens)
2. Always use HTTPS for API calls
3. Implement rate limiting on backend
4. Use secure storage for tokens (React Native Keychain)
5. Implement proper session management
6. Add biometric authentication for sensitive operations
7. Regularly update dependencies for security patches

## 📝 Notes

- Screens are standalone and not yet integrated with main navigation
- Google Sign-In requires Firebase Web Client ID configuration
- Phone login requires custom backend implementation
- All user data is stored in Firebase Firestore
- Passwords are hashed by Firebase (never stored in plain text)

## 👥 Team Integration

These screens are designed to work independently so team members can:
- Work on home screen separately
- Build app carousel independently
- Create profile forms without conflicts

Integration points will be added later through the main navigation system.


