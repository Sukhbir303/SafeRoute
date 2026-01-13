/**
 * Main Navigation setup for SafeRoute App
 * Handles routing between onboarding and authenticated app flows
 */

import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import { RouteProvider } from '../context/RouteContext';

// Import Screens
import CarouselScreen from '../screens/CarouselScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import ProfileForm from '../screens/ProfileForm';
import HomeScreen from '../screens/HomeScreen';
import SearchRouteScreen from '../screens/SearchRouteScreen';
import CircleScreen from '../screens/CircleScreen';
import Setting from '../screens/Setting';

const Stack = createStackNavigator();

// Onboarding Stack - for unauthenticated users
const OnboardingStack = () => {
  const { hasSeenCarousel } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'white' },
      }}>
      {!hasSeenCarousel && (
        <Stack.Screen name="Carousel" component={CarouselScreen} />
      )}
      <Stack.Screen name="Signup" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ProfileForm" component={ProfileForm} />
    </Stack.Navigator>
  );
};

// App Stack - for authenticated users
const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'white' },
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen 
        name="SearchRoute" 
        component={SearchRouteScreen}
        options={{ headerShown: true, title: 'Search Route' }}
      />
      <Stack.Screen 
        name="Circle" 
        component={CircleScreen}
        options={{ headerShown: true, title: 'My Circle' }}
      />
      <Stack.Screen 
        name="Settings" 
        component={Setting}
        options={{ headerShown: true, title: 'Settings' }}
      />
    </Stack.Navigator>
  );
};

// Root Navigator - decides which stack to show
const RootNavigator = () => {
  const { isAuthenticated, needsProfile, isLoading } = useAuth();

  // Show loading screen while checking auth state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        // User is authenticated - show app
        <Stack.Screen name="App" component={AppStack} />
      ) : needsProfile ? (
        // User signed up but needs to complete profile
        <Stack.Screen name="ProfileForm" component={ProfileForm} />
      ) : (
        // User is not authenticated - show onboarding
        <Stack.Screen name="Onboarding" component={OnboardingStack} />
      )}
    </Stack.Navigator>
  );
};

// Main App Navigator with providers
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RouteProvider>
        <RootNavigator />
      </RouteProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default AppNavigator;
