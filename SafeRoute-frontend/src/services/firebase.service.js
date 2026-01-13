import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

/**
 * Firebase Authentication Service
 * Handles all authentication operations for the app
 */

class AuthService {
  constructor() {
    // Configure Google Sign In
    this.configureGoogleSignIn();
  }

  /**
   * Configure Google Sign In
   */
  configureGoogleSignIn() {
    try {
      GoogleSignin.configure({
        webClientId: '534086943156-s4eiecq4ittu8fqhvf3588buima4aekd.apps.googleusercontent.com', // From Firebase Console
        offlineAccess: true,
      });
    } catch (error) {
      console.error('Error configuring Google Sign In:', error);
    }
  }

  /**
   * Sign up with email and password
   */
  async signUp(email, password, phoneNumber) {
    try {
      // Create user with email and password
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Store additional user data in Firestore
      await firestore().collection('users').doc(user.uid).set({
        email: email,
        phoneNumber: phoneNumber,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

      // Send email verification
      await user.sendEmailVerification();

      return user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Sign in with email and password
   */
  async signIn(email, password) {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Sign in with Google
   */
  async signInWithGoogle() {
    try {
      // Check if device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // Get user's ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign in with the credential
      const userCredential = await auth().signInWithCredential(googleCredential);
      const user = userCredential.user;

      // Check if this is a new user and create Firestore record
      const userDoc = await firestore().collection('users').doc(user.uid).get();
      
      if (!userDoc.exists) {
        await firestore().collection('users').doc(user.uid).set({
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber || '',
          createdAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
      }

      return user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Sign out
   */
  async signOut() {
    try {
      // Sign out from Google if signed in
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        await GoogleSignin.signOut();
      }

      // Sign out from Firebase
      await auth().signOut();
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Reset password
   */
  async resetPassword(email) {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Get current user
   */
  getCurrentUser() {
    return auth().currentUser;
  }

  /**
   * Check if user is signed in
   */
  isSignedIn() {
    return auth().currentUser !== null;
  }

  /**
   * Update user profile
   */
  async updateProfile(displayName, photoURL) {
    try {
      const user = auth().currentUser;
      if (!user) {
        throw new Error('No user is currently signed in');
      }

      await user.updateProfile({
        displayName: displayName,
        photoURL: photoURL,
      });

      // Update Firestore
      await firestore().collection('users').doc(user.uid).update({
        displayName: displayName,
        photoURL: photoURL,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Update user phone number
   */
  async updatePhoneNumber(phoneNumber) {
    try {
      const user = auth().currentUser;
      if (!user) {
        throw new Error('No user is currently signed in');
      }

      // Update Firestore
      await firestore().collection('users').doc(user.uid).update({
        phoneNumber: phoneNumber,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Get user data from Firestore
   */
  async getUserData(userId) {
    try {
      const userDoc = await firestore().collection('users').doc(userId).get();
      
      if (userDoc.exists) {
        return userDoc.data();
      } else {
        throw new Error('User data not found');
      }
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Listen to auth state changes
   */
  onAuthStateChanged(callback) {
    return auth().onAuthStateChanged(callback);
  }

  /**
   * Handle authentication errors
   */
  handleAuthError(error) {
    console.error('Auth Error:', error);

    switch (error.code) {
      case 'auth/email-already-in-use':
        return new Error('This email is already registered. Please sign in instead.');
      
      case 'auth/invalid-email':
        return new Error('Invalid email address.');
      
      case 'auth/operation-not-allowed':
        return new Error('Email/password accounts are not enabled.');
      
      case 'auth/weak-password':
        return new Error('Password is too weak. Please use a stronger password.');
      
      case 'auth/user-disabled':
        return new Error('This account has been disabled.');
      
      case 'auth/user-not-found':
        return new Error('No account found with this email.');
      
      case 'auth/wrong-password':
        return new Error('Incorrect password.');
      
      case 'auth/invalid-credential':
        return new Error('Invalid credentials. Please check your email and password.');
      
      case 'auth/account-exists-with-different-credential':
        return new Error('An account already exists with the same email but different sign-in credentials.');
      
      case 'auth/network-request-failed':
        return new Error('Network error. Please check your internet connection.');
      
      case 'auth/too-many-requests':
        return new Error('Too many unsuccessful attempts. Please try again later.');
      
      default:
        return new Error(error.message || 'An error occurred during authentication.');
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;

