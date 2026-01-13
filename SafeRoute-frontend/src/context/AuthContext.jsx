// Auth Context for managing authentication state and user profile
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';

const AuthContext = createContext();

const AUTH_KEY = '@saferoute_auth';
const PROFILE_KEY = '@saferoute_profile_complete';
const USER_KEY = '@saferoute_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [needsProfile, setNeedsProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenCarousel, setHasSeenCarousel] = useState(false);

  // Load auth state from AsyncStorage on mount
  useEffect(() => {
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const [authData, profileComplete, userData, carouselSeen] = await Promise.all([
        AsyncStorage.getItem(AUTH_KEY),
        AsyncStorage.getItem(PROFILE_KEY),
        AsyncStorage.getItem(USER_KEY),
        AsyncStorage.getItem('@saferoute_carousel_seen'),
      ]);

      if (authData === 'true') {
        setIsAuthenticated(true);
        setNeedsProfile(profileComplete !== 'true');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      }
      
      if (carouselSeen === 'true') {
        setHasSeenCarousel(true);
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData) => {
    try {
      setUser(userData);
      setIsAuthenticated(true);
      setNeedsProfile(false); // Login means profile already exists
      
      await AsyncStorage.multiSet([
        [AUTH_KEY, 'true'],
        [PROFILE_KEY, 'true'],
        [USER_KEY, JSON.stringify(userData)],
      ]);
    } catch (error) {
      console.error('Error saving login state:', error);
    }
  };

  const signup = async (userData) => {
    try {
      setUser(userData);
      setIsAuthenticated(false); // Not fully authenticated until profile is complete
      setNeedsProfile(true); // Signup requires profile completion
      
      await AsyncStorage.multiSet([
        [AUTH_KEY, 'false'],
        [PROFILE_KEY, 'false'],
        [USER_KEY, JSON.stringify(userData)],
      ]);
    } catch (error) {
      console.error('Error saving signup state:', error);
    }
  };

  const completeProfile = async (profileData) => {
    try {
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      setIsAuthenticated(true);
      setNeedsProfile(false);
      
      await AsyncStorage.multiSet([
        [AUTH_KEY, 'true'],
        [PROFILE_KEY, 'true'],
        [USER_KEY, JSON.stringify(updatedUser)],
      ]);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      setIsAuthenticated(false);
      setNeedsProfile(false);
      
      await AsyncStorage.multiRemove([AUTH_KEY, PROFILE_KEY, USER_KEY]);
    } catch (error) {
      console.error('Error clearing auth state:', error);
    }
  };

  const markCarouselSeen = async () => {
    try {
      setHasSeenCarousel(true);
      await AsyncStorage.setItem('@saferoute_carousel_seen', 'true');
    } catch (error) {
      console.error('Error saving carousel state:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        needsProfile,
        isLoading,
        hasSeenCarousel,
        login,
        signup,
        completeProfile,
        logout,
        markCarouselSeen,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
