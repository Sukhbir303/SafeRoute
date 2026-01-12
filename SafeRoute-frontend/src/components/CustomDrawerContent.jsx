import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';

const CustomDrawerContent = ({ navigation, onClose }) => {
  const { theme, toggleTheme, colors } = useTheme();

  const menuItems = [
    { name: 'Settings', icon: 'settings-outline', screen: 'Settings' },
    { name: 'Offline Maps', icon: 'map-outline', screen: 'OfflineMaps' },
    { name: 'Journey History', icon: 'time-outline', screen: 'JourneyHistory' },
    { name: 'Evidence Vault', icon: 'folder-outline', screen: 'EvidenceVault' },
    { name: 'Safety Resources', icon: 'shield-checkmark-outline', screen: 'SafetyResources' },
    { name: 'Help & Support', icon: 'help-circle-outline', screen: 'HelpSupport' },
    { name: 'Logout', icon: 'log-out-outline', screen: 'Logout' },
  ];

  const handleMenuPress = (screen) => {
    if (onClose) onClose(); // Close drawer first
    if (screen === 'Logout') {
      // Handle logout logic here
      console.log('Logout pressed');
    } else {
      navigation.navigate(screen);
    }
  };

  const themeStyles = {
    container: {
      backgroundColor: colors.primary || colors.softBlue || '#E4F2FB',
    },
    text: {
      color: colors.textPrimary || colors.charcoal || '#2B344B',
    },
    iconColor: colors.textPrimary || colors.charcoal || '#2B344B',
  };

  return (
    <SafeAreaView style={[styles.container, themeStyles.container]} edges={['top', 'left', 'right']}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarCircle}>
          <Icon name="person" size={40} color="#FFFFFF" />
        </View>
        <Text style={[styles.userName, themeStyles.text]}>User Name</Text>
        <Text style={[styles.phoneNumber, themeStyles.text]}>+91 98765 43210</Text>
        <View style={styles.safetyBadge}>
          <Text style={styles.safetyBadgeText}>Safety Score: 95</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Menu Items */}
      <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuRow,
              { backgroundColor: 'transparent' }
            ]}
            onPress={() => handleMenuPress(item.screen)}
            activeOpacity={0.7}
            underlayColor={theme === 'dark' ? '#1a2332' : '#d4e7f7'}
          >
            <View style={styles.menuRowContent}>
              <Icon 
                name={item.icon} 
                size={24} 
                color={themeStyles.iconColor}
                style={styles.menuIcon}
              />
              <Text style={[styles.menuText, themeStyles.text]}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.divider} />
        
        {/* Theme Toggle */}
        <View style={styles.themeToggleContainer}>
          <Icon 
            name={theme === 'dark' ? 'moon' : 'sunny'} 
            size={22} 
            color={themeStyles.iconColor}
            style={styles.themeIcon}
          />
          <Text style={[styles.themeToggleText, themeStyles.text]}>
            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: '#D1D5DB', true: colors.tealGreen || '#1DB9A0' }}
            thumbColor={theme === 'dark' ? '#FFFFFF' : '#F3F4F6'}
            ios_backgroundColor="#D1D5DB"
          />
        </View>

        {/* App Version */}
        <Text style={[styles.versionText, { color: colors.mutedGray || '#9AA6B8' }]}>
          Version 1.0.0
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1DB9A0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  phoneNumber: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 12,
  },
  safetyBadge: {
    backgroundColor: '#1DB9A0',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  safetyBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginVertical: 8,
  },
  menuContainer: {
    flex: 1,
    paddingTop: 8,
  },
  menuRow: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  menuRowContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 16,
    width: 24,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
  },
  bottomSection: {
    paddingBottom: 16,
  },
  themeToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  themeIcon: {
    marginRight: 12,
    width: 24,
  },
  themeToggleText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  versionText: {
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 12,
    opacity: 0.6,
  },
});

export default CustomDrawerContent;
