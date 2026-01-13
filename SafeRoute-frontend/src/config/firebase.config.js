/**
 * Firebase Configuration
 * 
 * IMPORTANT: Replace these values with your actual Firebase project credentials
 * 
 * To get your Firebase config:
 * 1. Go to Firebase Console (https://console.firebase.google.com/)
 * 2. Select your project (or create a new one)
 * 3. Go to Project Settings > General
 * 4. Scroll down to "Your apps" section
 * 5. Click on "Add app" and select Android/iOS
 * 6. Download google-services.json (Android) and GoogleService-Info.plist (iOS)
 * 7. Place these files in the appropriate directories:
 *    - Android: SafeRoute-frontend/android/app/google-services.json
 *    - iOS: SafeRoute-frontend/ios/GoogleService-Info.plist
 */

// NOTE: With React Native Firebase, you don't need to initialize Firebase manually
// The native modules will read from google-services.json and GoogleService-Info.plist

// However, if you need web client ID for Google Sign-In:
export const FIREBASE_CONFIG = {
  // Get this from Firebase Console > Project Settings > General > Web API Key
  webClientId: '534086943156-s4eiecq4ittu8fqhvf3588buima4aekd.apps.googleusercontent.com',
  
  // Optional: Add these if you're using Firebase for web as well
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

export default FIREBASE_CONFIG;

