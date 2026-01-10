import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const PasswordInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  showStrength = false,
  ...props
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Calculate password strength
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: COLORS.mutedGray };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) {
      return { strength, label: 'Weak', color: COLORS.alertRed };
    } else if (strength === 3) {
      return { strength, label: 'Fair', color: COLORS.amber };
    } else if (strength === 4) {
      return { strength, label: 'Good', color: COLORS.tealGreen };
    } else {
      return { strength, label: 'Strong', color: COLORS.safeGreen };
    }
  };

  const passwordStrength = showStrength ? getPasswordStrength(value) : null;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, error && styles.inputError]}
          placeholder={placeholder}
          placeholderTextColor={COLORS.mutedGray}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!passwordVisible}
          autoCapitalize="none"
          {...props}
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
      
      {showStrength && value && passwordStrength && (
        <View style={styles.strengthContainer}>
          <View style={styles.strengthBarContainer}>
            <View
              style={[
                styles.strengthBar,
                {
                  width: `${(passwordStrength.strength / 5) * 100}%`,
                  backgroundColor: passwordStrength.color,
                },
              ]}
            />
          </View>
          <Text style={[styles.strengthLabel, { color: passwordStrength.color }]}>
            {passwordStrength.label}
          </Text>
        </View>
      )}
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  passwordContainer: {
    position: 'relative',
  },
  input: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 16,
    paddingRight: 50,
    fontSize: 16,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: COLORS.alertRed,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  eyeIconText: {
    fontSize: 20,
  },
  strengthContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  strengthBarContainer: {
    flex: 1,
    height: 4,
    backgroundColor: COLORS.lightGray,
    borderRadius: 2,
    overflow: 'hidden',
  },
  strengthBar: {
    height: '100%',
    borderRadius: 2,
  },
  strengthLabel: {
    fontSize: 12,
    fontWeight: '600',
    minWidth: 50,
  },
  errorText: {
    color: COLORS.alertRed,
    fontSize: 12,
    marginTop: 4,
  },
});

export default PasswordInput;


