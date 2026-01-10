import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../../constants';

const SocialButton = ({
  provider, // 'google', 'facebook', 'apple'
  onPress,
  loading = false,
  disabled = false,
  style,
}) => {
  const getButtonConfig = () => {
    switch (provider) {
      case 'google':
        return {
          icon: '🔍',
          text: 'Continue with Google',
          backgroundColor: COLORS.background,
          textColor: COLORS.text,
          borderColor: COLORS.mutedGray,
        };
      case 'facebook':
        return {
          icon: '📘',
          text: 'Continue with Facebook',
          backgroundColor: '#1877F2',
          textColor: '#FFFFFF',
          borderColor: '#1877F2',
        };
      case 'apple':
        return {
          icon: '',
          text: 'Continue with Apple',
          backgroundColor: '#000000',
          textColor: '#FFFFFF',
          borderColor: '#000000',
        };
      default:
        return {
          icon: '',
          text: 'Continue',
          backgroundColor: COLORS.background,
          textColor: COLORS.text,
          borderColor: COLORS.mutedGray,
        };
    }
  };

  const config = getButtonConfig();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: config.backgroundColor,
          borderColor: config.borderColor,
        },
        (loading || disabled) && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={loading || disabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={config.textColor} />
      ) : (
        <>
          {config.icon && <Text style={styles.icon}>{config.icon}</Text>}
          <Text style={[styles.buttonText, { color: config.textColor }]}>
            {config.text}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    borderWidth: 2,
    marginBottom: 12,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  icon: {
    fontSize: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SocialButton;


