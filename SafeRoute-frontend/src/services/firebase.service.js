/**
 * Mock Firebase Authentication Service
 * Simulates authentication operations for the app
 * TODO: Replace with actual Firebase when google-services.json is configured
 */

// Mock user database
const mockUsers = new Map();

class AuthService {
  constructor() {
    // Mock initialization
    console.log('Mock Auth Service initialized');
  }

  /**
   * Configure Google Sign In (Mock)
   */
  configureGoogleSignIn() {
    console.log('Mock Google Sign In configured');
  }

  /**
   * Sign up with email and password (Mock)
   */
  async signUp(email, password, phoneNumber) {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user already exists
      if (mockUsers.has(email)) {
        throw new Error('The email address is already in use by another account.');
      }

      // Create mock user
      const user = {
        uid: `mock_${Date.now()}`,
        email: email,
        phoneNumber: phoneNumber,
        emailVerified: false,
        createdAt: new Date().toISOString(),
      };

      mockUsers.set(email, { ...user, password });
      console.log('Mock user created:', email);

      return user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Sign in with email and password (Mock)
   */
  async signIn(email, password) {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const userData = mockUsers.get(email);
      
      if (!userData || userData.password !== password) {
        throw new Error('The password is invalid or the user does not have a password.');
      }

      const user = {
        uid: userData.uid,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        emailVerified: userData.emailVerified,
      };

      console.log('Mock user signed in:', email);
      return user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Sign in with Google (Mock)
   */
  async signInWithGoogle() {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = {
        uid: `google_mock_${Date.now()}`,
        email: 'mockuser@gmail.com',
        displayName: 'Mock User',
        photoURL: null,
        phoneNumber: '',
        emailVerified: true,
      };

      console.log('Mock Google sign in successful');
      return user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Sign out (Mock)
   */
  async signOut() {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Mock user signed out');
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Reset password (Mock)
   */
  async resetPassword(email) {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Mock password reset email sent to:', email);
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Get current user (Mock)
   */
  getCurrentUser() {
    return null; // No persistent session in mock
  }

  /**
   * Check if user is signed in (Mock)
   */
  isSignedIn() {
    return false; // No persistent session in mock
  }
  }

  /**
   * Update user profile (Mock)
   */
  async updateProfile(displayName, photoURL) {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Mock profile updated:', displayName);
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Update user phone number (Mock)
   */
  async updatePhoneNumber(phoneNumber) {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Mock phone number updated:', phoneNumber);
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Get user data from Firestore (Mock)
   */
  async getUserData(userId) {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return mock user data
      return {
        email: 'mockuser@example.com',
        displayName: 'Mock User',
        phoneNumber: '+1234567890',
        photoURL: null,
      };
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Listen to auth state changes (Mock)
   */
  onAuthStateChanged(callback) {
    // Mock implementation - call callback with null initially
    setTimeout(() => callback(null), 0);
    return () => {}; // Return unsubscribe function
  }

  /**
   * Handle authentication errors
   */
  handleAuthError(error) {
    console.error('Auth Error:', error);

    // Handle error codes or return the original error
    if (error.message) {
      return error;
    }
    
    return new Error(error.message || 'An error occurred during authentication.');
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;

