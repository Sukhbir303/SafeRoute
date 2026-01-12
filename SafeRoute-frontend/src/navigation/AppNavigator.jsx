// Navigation setup using React Navigation
// Install: npm install @react-navigation/native @react-navigation/stack
// npm install react-native-screens react-native-safe-area-context

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, SignUpScreen, LoginScreen, ProfileForm } from '../screens';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        {/* Auth Screens */}
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
        
        {/* Profile Setup (after signup) */}
        <Stack.Screen 
          name="ProfileForm" 
          component={ProfileForm}
          options={{ 
            headerShown: false,
            gestureEnabled: false, // Prevent going back
          }}
        />
        
        {/* Main App Screens */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
