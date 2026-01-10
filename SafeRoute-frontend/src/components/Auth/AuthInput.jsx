import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const AuthInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  maxLength,
  editable = true,
  multiline = false,
  numberOfLines = 1,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          !editable && styles.inputDisabled,
          multiline && styles.inputMultiline,
        ]}
        placeholder={placeholder}
        placeholderTextColor={COLORS.mutedGray}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        maxLength={maxLength}
        editable={editable}
        multiline={multiline}
        numberOfLines={numberOfLines}
        {...props}
      />
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
  inputDisabled: {
    opacity: 0.6,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: COLORS.alertRed,
    fontSize: 12,
    marginTop: 4,
  },
});

export default AuthInput;


