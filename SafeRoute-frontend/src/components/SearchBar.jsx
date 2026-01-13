import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const SearchBar = ({
  onPress,
  onMenuPress,
  showMenu = true,
  placeholder = 'Where to?',
}) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const handlePress = () => {
    // If custom onPress is provided, use it, otherwise navigate to SearchRouteScreen
    if (onPress) {
      onPress();
    } else {
      navigation.navigate('SearchRouteScreen');
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colors.softWhite || colors.softBlue },
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {showMenu && (
        <TouchableOpacity
          onPress={onMenuPress}
          style={styles.menuButton}
          activeOpacity={0.7}
        >
          <Icon name="menu" size={20} color={colors.charcoal || '#333'} />
        </TouchableOpacity>
      )}
      <Text style={[styles.text, { color: colors.mutedGray }]}>
        {placeholder}
      </Text>
      <View style={styles.iconPlaceholder}>
        <Icon name="mic" size={18} color={colors.mutedGray} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  menuButton: {
    marginRight: 12,
    padding: 4,
  },
  text: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  iconPlaceholder: {
    marginLeft: 10,
    padding: 4,
  },
});

export default SearchBar;
