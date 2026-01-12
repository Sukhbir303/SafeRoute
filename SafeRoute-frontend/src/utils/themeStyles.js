import {StyleSheet, Platform} from 'react-native';

export const createThemeStyles = colors => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary || colors.midnightBlue || colors.softBlue,
    },
    textPrimary: {
      color: colors.textPrimary || colors.softWhite || colors.charcoal,
    },
    textSecondary: {
      color: colors.textSecondary || colors.coolGray || colors.darkGray,
    },
    card: {
      padding: 12,
      borderRadius: 12,
      backgroundColor: colors.deepNavy || colors.lightGray,
    },
    shadow: {
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        android: {
          elevation: 5,
        },
      }),
    },
  });
};

export default createThemeStyles;
