import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '../../constants';
import { authService } from '../../services/firebase.service';

const LoginScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Validate email or phone
  const validateEmailOrPhone = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    return emailRegex.test(value) || phoneRegex.test(value.replace(/\s/g, ''));
  };

  // Handle input change
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.emailOrPhone) {
      newErrors.emailOrPhone = 'Email or phone number is required';
    } else if (!validateEmailOrPhone(formData.emailOrPhone)) {
      newErrors.emailOrPhone = 'Please enter a valid email or 10-digit phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login
  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Determine if input is email or phone
      const isEmail = formData.emailOrPhone.includes('@');
      
      if (isEmail) {
        // Sign in with email
        await authService.signIn(formData.emailOrPhone, formData.password);
      } else {
        // For phone login, we need to retrieve the email associated with the phone
        // This would require a custom backend or Firebase function
        // For now, we'll show an alert
        Alert.alert(
          'Phone Login',
          'Phone number login requires additional setup. Please use email for now.',
        );
        setLoading(false);
        return;
      }

      Alert.alert('Success', 'Logged in successfully!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await authService.signInWithGoogle();
      
      Alert.alert('Success', 'Signed in with Google successfully!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Google Sign In Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle forgot password
  const handleForgotPassword = async () => {
    if (!formData.emailOrPhone) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    const isEmail = formData.emailOrPhone.includes('@');
    if (!isEmail) {
      Alert.alert('Error', 'Please enter your email address for password reset');
      return;
    }

    try {
      await authService.resetPassword(formData.emailOrPhone);
      Alert.alert('Success', 'Password reset email sent! Check your inbox.');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue to SafeRoute</Text>
        </View>

        <View style={styles.form}>
          {/* Email or Phone Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email or Phone Number</Text>
            <TextInput
              style={[styles.input, errors.emailOrPhone && styles.inputError]}
              placeholder="Enter email or phone number"
              placeholderTextColor={COLORS.mutedGray}
              value={formData.emailOrPhone}
              onChangeText={(value) => handleInputChange('emailOrPhone', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.emailOrPhone && (
              <Text style={styles.errorText}>{errors.emailOrPhone}</Text>
            )}
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.passwordInput,
                  errors.password && styles.inputError,
                ]}
                placeholder="Enter your password"
                placeholderTextColor={COLORS.mutedGray}
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry={!passwordVisible}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <Text style={styles.eyeIconText}>
                  {passwordVisible ? '👁️' : '👁️‍🗨️'}
                </Text>
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          {/* Forgot Password Link */}
          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={handleForgotPassword}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginButton, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.softWhite} />
            ) : (
              <Text style={styles.loginButtonText}>Log In</Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.divider} />
          </View>

          {/* Google Sign In Button */}
          <TouchableOpacity
            style={[styles.googleButton, loading && styles.buttonDisabled]}
            onPress={handleGoogleSignIn}
            disabled={loading}
          >
            <Text style={styles.googleButtonText}>🔍 Continue with Google</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={styles.signUpLinkContainer}>
            <Text style={styles.signUpLinkText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: COLORS.alertRed,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  eyeIconText: {
    fontSize: 20,
  },
  errorText: {
    color: COLORS.alertRed,
    fontSize: 12,
    marginTop: 4,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: COLORS.tealGreen,
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: COLORS.tealGreen,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: COLORS.tealGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.mutedGray,
  },
  dividerText: {
    color: COLORS.textSecondary,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  googleButton: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.mutedGray,
  },
  googleButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
  signUpLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signUpLinkText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  signUpLink: {
    color: COLORS.tealGreen,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LoginScreen;

