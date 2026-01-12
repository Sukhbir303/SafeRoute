#!/bin/bash

# SafeRoute - Install Dependencies Script
# This script installs all required dependencies for the authentication system

echo "🚀 Installing SafeRoute Authentication Dependencies..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the SafeRoute-frontend directory."
    exit 1
fi

echo "📦 Installing npm packages..."
npm install \
  @react-native-firebase/app \
  @react-native-firebase/auth \
  @react-native-firebase/firestore \
  @react-native-google-signin/google-signin \
  react-native-permissions \
  @react-navigation/native \
  @react-navigation/stack \
  react-native-gesture-handler \
  react-native-reanimated

echo ""
echo "✅ npm packages installed successfully!"
echo ""

# Check platform
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS - install iOS pods
    echo "🍎 Detected macOS - Installing iOS CocoaPods..."
    cd ios
    pod install
    cd ..
    echo "✅ iOS pods installed successfully!"
    echo ""
fi

echo "📝 Next Steps:"
echo ""
echo "1. Set up Firebase project following FIREBASE_SETUP.md"
echo "2. Download and place configuration files:"
echo "   - Android: google-services.json → android/app/"
echo "   - iOS: GoogleService-Info.plist → ios/ (via Xcode)"
echo "3. Update firebase.config.js with your Web Client ID"
echo "4. Run the app:"
echo "   - Android: npm run android"
echo "   - iOS: npm run ios"
echo ""
echo "🎉 Installation complete!"
echo ""
echo "📚 For detailed setup instructions, see FIREBASE_SETUP.md"
echo ""


