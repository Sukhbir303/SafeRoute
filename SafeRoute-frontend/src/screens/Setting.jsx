import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';

const Setting = ({ navigation }) => {
  // State for settings
  const [safetyCheckIns, setSafetyCheckIns] = useState(false);
  const [batteryAlertEnabled, setBatteryAlertEnabled] = useState(false);
  const [batteryThreshold, setBatteryThreshold] = useState(20);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  // Language options
  const languages = [
    'English',
    'Spanish',
    'French',
    'German',
    'Hindi',
    'Chinese',
  ];

  // Handle Edit Profile navigation
  const handleEditProfile = () => {
    navigation.navigate('ProfileForm');
  };

  // Handle Safety Check-Ins toggle
  const handleSafetyCheckInsToggle = value => {
    setSafetyCheckIns(value);
    if (value) {
      Alert.alert(
        'Safety Check-Ins Enabled',
        'You will receive periodic check-in notifications to ensure your safety.',
      );
    }
  };

  // Handle Battery Alert toggle
  const handleBatteryAlertToggle = value => {
    setBatteryAlertEnabled(value);
    if (value) {
      Alert.alert(
        'Battery Alert Enabled',
        `You will be notified when battery drops below ${batteryThreshold}%.`,
      );
    }
  };

  // Handle Battery Threshold selection
  const handleBatteryThresholdChange = threshold => {
    setBatteryThreshold(threshold);
    if (batteryAlertEnabled) {
      Alert.alert(
        'Battery Threshold Updated',
        `You will be notified when battery drops below ${threshold}%.`,
      );
    }
  };

  // Handle Language Change
  const handleLanguageChange = language => {
    setSelectedLanguage(language);
    Alert.alert('Language Changed', `Language changed to ${language}`);
  };

  // Handle Save Settings
  const handleSaveSettings = () => {
    Alert.alert(
      'Settings Saved',
      'Your settings have been saved successfully!',
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.settingsContainer}>
        <Text style={styles.title}>Settings</Text>

        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={handleEditProfile}
          >
            <View style={styles.profileButtonContent}>
              <View>
                <Text style={styles.profileButtonTitle}>Edit Profile</Text>
                <Text style={styles.profileButtonSubtext}>
                  Update your personal information and emergency contacts
                </Text>
              </View>
              <Text style={styles.profileButtonArrow}>›</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Safety Check-Ins Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety Features</Text>

          <View style={styles.settingCard}>
            <View style={styles.settingHeader}>
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>Safety Check-Ins</Text>
                <Text style={styles.settingDescription}>
                  Receive periodic notifications to confirm you're safe during
                  your journey
                </Text>
              </View>
              <Switch
                value={safetyCheckIns}
                onValueChange={handleSafetyCheckInsToggle}
                trackColor={{ false: '#D1D5DB', true: '#86EFAC' }}
                thumbColor={safetyCheckIns ? '#1DB9A0' : '#F3F4F6'}
                ios_backgroundColor="#D1D5DB"
              />
            </View>

            {safetyCheckIns && (
              <View style={styles.subSettingContainer}>
                <Text style={styles.subSettingLabel}>Check-in Interval</Text>
                <View style={styles.intervalOptions}>
                  {['15 min', '30 min', '1 hour'].map(interval => (
                    <TouchableOpacity
                      key={interval}
                      style={styles.intervalButton}
                    >
                      <Text style={styles.intervalButtonText}>{interval}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Battery Alert Setup Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Battery Alerts</Text>

          <View style={styles.settingCard}>
            <View style={styles.settingHeader}>
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>Battery Alert</Text>
                <Text style={styles.settingDescription}>
                  Get notified when your battery is running low to ensure you
                  can call for help
                </Text>
              </View>
              <Switch
                value={batteryAlertEnabled}
                onValueChange={handleBatteryAlertToggle}
                trackColor={{ false: '#D1D5DB', true: '#86EFAC' }}
                thumbColor={batteryAlertEnabled ? '#1DB9A0' : '#F3F4F6'}
                ios_backgroundColor="#D1D5DB"
              />
            </View>

            {batteryAlertEnabled && (
              <View style={styles.subSettingContainer}>
                <Text style={styles.subSettingLabel}>Alert Threshold</Text>
                <View style={styles.thresholdOptions}>
                  {[10, 15, 20, 25, 30].map(threshold => (
                    <TouchableOpacity
                      key={threshold}
                      style={[
                        styles.thresholdButton,
                        batteryThreshold === threshold &&
                          styles.thresholdButtonSelected,
                      ]}
                      onPress={() => handleBatteryThresholdChange(threshold)}
                    >
                      <Text
                        style={[
                          styles.thresholdButtonText,
                          batteryThreshold === threshold &&
                            styles.thresholdButtonTextSelected,
                        ]}
                      >
                        {threshold}%
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Language Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Language & Region</Text>

          <View style={styles.settingCard}>
            <Text style={styles.settingTitle}>App Language</Text>
            <Text style={styles.settingDescription}>
              Choose your preferred language
            </Text>

            <View style={styles.languageOptions}>
              {languages.map(language => (
                <TouchableOpacity
                  key={language}
                  style={[
                    styles.languageOption,
                    selectedLanguage === language &&
                      styles.languageOptionSelected,
                  ]}
                  onPress={() => handleLanguageChange(language)}
                >
                  <View style={styles.languageOptionContent}>
                    <View style={styles.radioButton}>
                      {selectedLanguage === language && (
                        <View style={styles.radioButtonSelected} />
                      )}
                    </View>
                    <Text
                      style={[
                        styles.languageOptionText,
                        selectedLanguage === language &&
                          styles.languageOptionTextSelected,
                      ]}
                    >
                      {language}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Additional Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More Options</Text>

          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Notification Settings</Text>
            <Text style={styles.optionButtonArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Privacy & Security</Text>
            <Text style={styles.optionButtonArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Help & Support</Text>
            <Text style={styles.optionButtonArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionButtonText}>About SafeRoute</Text>
            <Text style={styles.optionButtonArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveSettings}
        >
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </TouchableOpacity>

        {/* Version Info */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  settingsContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2B344B',
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2B344B',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  profileButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E4F2FB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  profileButtonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileButtonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1DB9A0',
    marginBottom: 4,
  },
  profileButtonSubtext: {
    fontSize: 14,
    color: '#5F6E7D',
    maxWidth: '85%',
  },
  profileButtonArrow: {
    fontSize: 32,
    color: '#1DB9A0',
    fontWeight: '300',
  },
  settingCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E4F2FB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  settingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B344B',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#5F6E7D',
    lineHeight: 20,
  },
  subSettingContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E4F2FB',
  },
  subSettingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2B344B',
    marginBottom: 10,
  },
  intervalOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  intervalButton: {
    flex: 1,
    backgroundColor: '#1DB9A0',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  intervalButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  thresholdOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  thresholdButton: {
    backgroundColor: '#F0F4F8',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#E4F2FB',
  },
  thresholdButtonSelected: {
    backgroundColor: '#1DB9A0',
    borderColor: '#1DB9A0',
  },
  thresholdButtonText: {
    color: '#2B344B',
    fontSize: 14,
    fontWeight: '600',
  },
  thresholdButtonTextSelected: {
    color: '#fff',
  },
  languageOptions: {
    marginTop: 16,
  },
  languageOption: {
    backgroundColor: '#F0F4F8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#E4F2FB',
  },
  languageOptionSelected: {
    backgroundColor: '#E8F6F4',
    borderColor: '#1DB9A0',
  },
  languageOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#9AA6B8',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1DB9A0',
  },
  languageOptionText: {
    fontSize: 16,
    color: '#2B344B',
  },
  languageOptionTextSelected: {
    fontWeight: '600',
    color: '#1DB9A0',
  },
  optionButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E4F2FB',
  },
  optionButtonText: {
    fontSize: 16,
    color: '#2B344B',
    fontWeight: '500',
  },
  optionButtonArrow: {
    fontSize: 24,
    color: '#9AA6B8',
    fontWeight: '300',
  },
  saveButton: {
    backgroundColor: '#1DB9A0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    shadowColor: '#1DB9A0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9AA6B8',
    marginTop: 10,
    marginBottom: 20,
  },
});

export default Setting;
