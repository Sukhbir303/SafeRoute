# SafeRoute Frontend (React Native)

> A comprehensive guide for MERN developers transitioning to React Native

## 📁 Folder Structure Explained

```
SafeRoute-frontend/
├── src/
│   ├── components/      # Reusable UI components (like buttons, cards)
│   ├── screens/         # Full screen components (like Home, Profile)
│   ├── navigation/      # Navigation setup (switching between screens)
│   ├── services/        # API calls and external services
│   ├── utils/           # Helper/utility functions
│   ├── constants/       # Fixed values (colors, URLs, etc.)
│   ├── hooks/           # Custom React hooks
│   ├── context/         # Global state management (like user data)
│   └── assets/          # Images, fonts, icons
├── android/             # Android-specific code
├── ios/                 # iOS-specific code
├── App.jsx              # Main app component
├── index.js             # App entry point
└── package.json         # Dependencies
```

## 🎯 What Goes Where? (Simple Explanation)

### 📂 **components/** - Reusable UI Parts

**What it is:** Small, reusable pieces of UI that you can use anywhere  
**When to use:** When you have UI elements used in multiple places  
**Examples:**

- `Button.jsx` - A custom button you can use everywhere
- `Card.jsx` - A card to display information
- `Header.jsx` - A header with title and back button
- `Input.jsx` - A custom text input field

**How to create:**

```javascript
// components/Button.jsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
```

**How to use:**

```javascript
import { Button } from '../components';

<Button title="Click Me" onPress={handlePress} />;
```

### 📂 **screens/** - Full Pages/Screens

**What it is:** Complete screens that users navigate to (like pages in a website)  
**When to use:** For each main page of your app  
**Examples:**

- `HomeScreen.jsx` - Main home page
- `LoginScreen.jsx` - Login page
- `ProfileScreen.jsx` - User profile page
- `MapScreen.jsx` - Map view page

**Structure of a screen:**

```javascript
// screens/HomeScreen.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../components';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to SafeRoute!</Text>
      <Button title="Go to Map" onPress={() => navigation.navigate('Map')} />
    </View>
  );
};

export default HomeScreen;
```

**Key difference from components:**

- Screens = Full pages (uses entire screen)
- Components = Small reusable parts (like buttons, cards)

### 📂 **navigation/** - Moving Between Screens

**What it is:** Controls how users move from one screen to another  
**When to use:** To set up all your app's screens and navigation flow  
**Example:**

```javascript
// navigation/AppNavigator.jsx
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, ProfileScreen, MapScreen } from '../screens';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
};
```

**Think of it as:** The router in React web apps (like React Router)

### 📂 **services/** - Talking to Backend

**What it is:** Functions that make API calls to your backend  
**When to use:** When you need to fetch or send data to the server  
**Example:**

```javascript
// services/api.service.js
const API_URL = 'http://localhost:5000/api';

class ApiService {
  async getUsers() {
    const response = await fetch(`${API_URL}/users`);
    return await response.json();
  }

  async createUser(userData) {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return await response.json();
  }
}

export default new ApiService();
```

**Using it in a screen:**

```javascript
import ApiService from '../services/api.service';

const users = await ApiService.getUsers();
```

### 📂 **utils/** - Helper Functions

**What it is:** Small useful functions you can use anywhere  
**When to use:** For formatting, validation, calculations  
**Examples:**

```javascript
// utils/helpers.js
export const formatDate = date => {
  return new Date(date).toLocaleDateString();
};

export const validateEmail = email => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
```

### 📂 **constants/** - Fixed Values

**What it is:** Values that don't change throughout the app  
**When to use:** For colors, API URLs, screen names, etc.  
**Example:**

```javascript
// constants/index.js
export const COLORS = {
  primary: '#007AFF',
  secondary: '#5856D6',
  danger: '#FF3B30',
  background: '#FFFFFF',
  text: '#000000',
};

export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000/api',
  TIMEOUT: 10000,
};

export const SCREENS = {
  HOME: 'Home',
  PROFILE: 'Profile',
  LOGIN: 'Login',
};
```

**Using it:**

```javascript
import { COLORS, SCREENS } from '../constants';

<View style={{ backgroundColor: COLORS.primary }}>
navigation.navigate(SCREENS.PROFILE);
```

### 📂 **hooks/** - Custom React Hooks

**What it is:** Reusable logic using React hooks (useState, useEffect, etc.)  
**When to use:** When you have logic that multiple components use  
**Example:**

```javascript
// hooks/useAsyncStorage.js
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAsyncStorage = (key, initialValue) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    // Load from storage
    AsyncStorage.getItem(key).then(item => {
      if (item) setValue(JSON.parse(item));
    });
  }, []);

  const setStoredValue = newValue => {
    setValue(newValue);
    AsyncStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
};
```

**Using it:**

```javascript
const [username, setUsername] = useAsyncStorage('username', '');
```

### 📂 **context/** - Global State (Share Data Across App)

**What it is:** A way to share data across many screens without passing props  
**When to use:** For user authentication, theme, language settings  
**Example:**

```javascript
// context/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = userData => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

**Wrapping your app:**

```javascript
// App.jsx
<AuthProvider>
  <AppNavigator />
</AuthProvider>
```

**Using in any screen:**

```javascript
import { useAuth } from '../context/AuthContext';

const { user, login, logout } = useAuth();
```

### 📂 **assets/** - Images, Fonts, Icons

**What it is:** Static files like images, fonts, icons  
**Structure:**

```
assets/
├── images/
│   ├── logo.png
│   └── background.jpg
├── fonts/
│   ├── Roboto-Regular.ttf
│   └── Roboto-Bold.ttf
└── icons/
    └── home-icon.png
```

**Using images:**

```javascript
import { Image } from 'react-native';

<Image source={require('../assets/images/logo.png')} />;
```

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.jsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
- [React Navigation Docs](https://reactnavigation.org/docs/getting-started) - essential for navigation
- [React Native Express](https://www.reactnative.express/) - Great tutorial for beginners

## 📝 How to Create New Features

### Creating a New Screen

**Step 1:** Create the screen file

```javascript
// src/screens/MapScreen.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MapScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Map Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapScreen;
```

**Step 2:** Export it from screens/index.js

```javascript
// src/screens/index.js
export { default as MapScreen } from './MapScreen';
```

**Step 3:** Add to navigation

```javascript
// src/navigation/AppNavigator.jsx
import { MapScreen } from '../screens';

<Stack.Screen name="Map" component={MapScreen} />;
```

**Step 4:** Navigate to it from any screen

```typescript
navigation.navigate('Map');
```

### Creating a New Component

**Step 1:** Create component file

```javascript
// src/components/Card.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ title, description }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default Card;
```

**Step 2:** Export from components/index.js

```javascript
// src/components/index.js
export { default as Card } from './Card';
```

**Step 3:** Use anywhere

```javascript
import { Card } from '../components';

<Card title="Hello" description="World" />;
```

## 🎨 React Native vs React Web - Key Differences

| React Web         | React Native                       | What it means     |
| ----------------- | ---------------------------------- | ----------------- |
| `<div>`           | `<View>`                           | Container element |
| `<span>` or `<p>` | `<Text>`                           | Text element      |
| `<button>`        | `<TouchableOpacity>` or `<Button>` | Clickable button  |
| `<input>`         | `<TextInput>`                      | Text input field  |
| `<img>`           | `<Image>`                          | Image element     |
| `<ul>`, `<ol>`    | `<FlatList>` or `<ScrollView>`     | Scrollable lists  |
| CSS files         | StyleSheet API                     | Styling           |
| `onClick`         | `onPress`                          | Click/tap events  |

**Styling Example:**

```javascript
// Web (CSS)
<div className="container" style={{ color: 'red' }}>

// React Native
<View style={styles.container}>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
```

## 🔑 Common Patterns & Examples

### Making an API Call in a Screen

```javascript
import React, { useState, useEffect } from 'react';
import ApiService from '../services/api.service';

const HomeScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await ApiService.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Text>Loading...</Text>;

  return (
    <View>
      {users.map(user => (
        <Text key={user.id}>{user.name}</Text>
      ))}
    </View>
  );
};
```

### Form Handling

```javascript
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleLogin = async () => {
  if (!email || !password) {
    alert('Please fill all fields');
    return;
  }

  try {
    const result = await ApiService.login({ email, password });
    // Handle success
  } catch (error) {
    alert('Login failed');
  }
};

return (
  <View>
    <TextInput
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
      keyboardType="email-address"
    />
    <TextInput
      placeholder="Password"
      value={password}
      onChangeText={setPassword}
      secureTextEntry
    />
    <Button title="Login" onPress={handleLogin} />
  </View>
);
```

## 📦 Essential Packages You'll Need

```bash
# Navigation
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context

# Storage (like localStorage in web)
npm install @react-native-async-storage/async-storage

# Icons
npm install react-native-vector-icons

# Maps
npm install react-native-maps

# Image Picker
npm install react-native-image-picker

# HTTP requests (alternative to fetch)
npm install axios
```

## 🐛 Common Issues & Solutions

**Problem:** "Metro bundler not running"  
**Solution:** Run `npm start` in a separate terminal

**Problem:** "Android build failed"  
**Solution:**

1. Clean build: `cd android && ./gradlew clean && cd ..`
2. Rebuild: `npm run android`

**Problem:** "Cannot connect to localhost from device"  
**Solution:** Use your computer's IP address instead of localhost

```javascript
const API_URL = 'http://192.168.1.100:5000/api'; // Your computer's IP
```

**Problem:** "Red screen errors"  
**Solution:** Read the error message carefully, it usually tells you what's wrong

## 🤝 Tips for MERN Developers

- **useState, useEffect work the same** as in React web
- **Components are similar** but use View/Text instead of div/p
- **Styling is JavaScript** (not CSS files), but uses similar properties
- **Navigation is different** - use React Navigation instead of React Router
- **No HTML elements** - everything is View, Text, Image, etc.
- **API calls are the same** - use fetch or axios like in React web

## 🎯 Quick Reference

**Import from 'react-native':**

```javascript
import {
  View, // Container
  Text, // Text display
  StyleSheet, // Styling
  TouchableOpacity, // Touchable button
  TextInput, // Input field
  Image, // Images
  ScrollView, // Scrollable container
  FlatList, // Efficient list
  ActivityIndicator, // Loading spinner
  Alert, // Alert dialogs
} from 'react-native';
```

**Common StyleSheet properties:**

```javascript
{
  flex: 1,                    // Flexible sizing
  flexDirection: 'row',       // row or column
  justifyContent: 'center',   // Main axis alignment
  alignItems: 'center',       // Cross axis alignment
  padding: 20,
  margin: 10,
  backgroundColor: '#fff',
  borderRadius: 8,
  fontSize: 16,
  fontWeight: 'bold',
  color: '#000',
}
```
