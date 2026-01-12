import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from 'react-native';

const ProfileForm = () => {
  // State for form fields
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [workAddress, setWorkAddress] = useState('');
  const [sosMethod, setSosMethod] = useState('');
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: '', phone: '', relationship: '' },
    { name: '', phone: '', relationship: '' },
  ]);

  // Handle profile photo upload from gallery
  const handleGalleryUpload = () => {
    Alert.alert(
      'Gallery Upload',
      'Gallery upload functionality will be implemented here',
    );
    // You can integrate react-native-image-picker here
    // Example: launchImageLibrary(options, callback)
  };

  // Handle profile photo capture from camera
  const handleCameraCapture = () => {
    Alert.alert(
      'Camera Capture',
      'Camera capture functionality will be implemented here',
    );
    // You can integrate react-native-image-picker here
    // Example: launchCamera(options, callback)
  };

  // Handle adding more emergency contacts
  const addEmergencyContact = () => {
    setEmergencyContacts([
      ...emergencyContacts,
      { name: '', phone: '', relationship: '' },
    ]);
  };

  // Handle removing emergency contact
  const removeEmergencyContact = index => {
    if (emergencyContacts.length > 2) {
      const updatedContacts = emergencyContacts.filter((_, i) => i !== index);
      setEmergencyContacts(updatedContacts);
    } else {
      Alert.alert('Error', 'Minimum 2 emergency contacts required');
    }
  };

  // Handle emergency contact changes
  const updateEmergencyContact = (index, field, value) => {
    const updatedContacts = [...emergencyContacts];
    updatedContacts[index][field] = value;
    setEmergencyContacts(updatedContacts);
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validation logic
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }
    if (!dateOfBirth.trim()) {
      Alert.alert('Error', 'Please enter your date of birth');
      return;
    }
    if (!gender) {
      Alert.alert('Error', 'Please select your gender');
      return;
    }
    if (!homeAddress.trim()) {
      Alert.alert('Error', 'Please enter your home address');
      return;
    }

    // Check if at least 2 emergency contacts are filled
    const filledContacts = emergencyContacts.filter(
      contact => contact.name.trim() && contact.phone.trim(),
    );
    if (filledContacts.length < 2) {
      Alert.alert('Error', 'Please provide at least 2 emergency contacts');
      return;
    }

    // Form submission logic here
    Alert.alert('Success', 'Profile saved successfully!');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Profile Setup</Text>

        {/* Profile Photo Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Profile Photo</Text>
          <View style={styles.photoUploadContainer}>
            {profilePhoto ? (
              <Image
                source={{ uri: profilePhoto }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Text style={styles.photoPlaceholderIcon}>👤</Text>
              </View>
            )}
          </View>
          <View style={styles.photoButtonsContainer}>
            <TouchableOpacity
              style={styles.photoButton}
              onPress={handleGalleryUpload}
            >
              <Text style={styles.photoButtonText}>📂 Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.photoButton}
              onPress={handleCameraCapture}
            >
              <Text style={styles.photoButtonText}>📷 Take Photo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Full Name */}
        <View style={styles.section}>
          <Text style={styles.label}>Full Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
            placeholderTextColor="#9AA6B8"
          />
        </View>

        {/* Date of Birth */}
        <View style={styles.section}>
          <Text style={styles.label}>Date of Birth *</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            placeholderTextColor="#9AA6B8"
          />
        </View>

        {/* Gender Selection */}
        <View style={styles.section}>
          <Text style={styles.label}>Gender *</Text>
          <View style={styles.genderContainer}>
            {['Male', 'Female', 'Other'].map(option => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.genderButton,
                  gender === option && styles.genderButtonSelected,
                ]}
                onPress={() => setGender(option)}
              >
                <Text
                  style={[
                    styles.genderButtonText,
                    gender === option && styles.genderButtonTextSelected,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Home Address */}
        <View style={styles.section}>
          <Text style={styles.label}>Home Address *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter your home address"
            value={homeAddress}
            onChangeText={setHomeAddress}
            multiline
            numberOfLines={3}
            placeholderTextColor="#9AA6B8"
          />
        </View>

        {/* Work Address */}
        <View style={styles.section}>
          <Text style={styles.label}>Work Address</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter your work address"
            value={workAddress}
            onChangeText={setWorkAddress}
            multiline
            numberOfLines={3}
            placeholderTextColor="#9AA6B8"
          />
        </View>

        {/* Emergency SOS Setup */}
        <View style={styles.section}>
          <Text style={styles.label}>Emergency SOS Setup</Text>
          <View style={styles.sosContainer}>
            <Text style={styles.sosDescription}>
              Choose how to activate emergency SOS
            </Text>

            {/* SOS Activation Options */}
            <TouchableOpacity
              style={[
                styles.sosOption,
                sosMethod === 'power3' && styles.sosOptionSelected,
              ]}
              onPress={() => setSosMethod('power3')}
            >
              <View style={styles.sosOptionContent}>
                <View style={styles.radioButton}>
                  {sosMethod === 'power3' && (
                    <View style={styles.radioButtonSelected} />
                  )}
                </View>
                <View style={styles.sosOptionTextContainer}>
                  <Text style={styles.sosOptionTitle}>
                    Press Power Button 3 Times
                  </Text>
                  <Text style={styles.sosOptionSubtext}>
                    Quick triple press to activate
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sosOption,
                sosMethod === 'power5' && styles.sosOptionSelected,
              ]}
              onPress={() => setSosMethod('power5')}
            >
              <View style={styles.sosOptionContent}>
                <View style={styles.radioButton}>
                  {sosMethod === 'power5' && (
                    <View style={styles.radioButtonSelected} />
                  )}
                </View>
                <View style={styles.sosOptionTextContainer}>
                  <Text style={styles.sosOptionTitle}>
                    Press Power Button 5 Times
                  </Text>
                  <Text style={styles.sosOptionSubtext}>
                    Five quick presses to activate
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sosOption,
                sosMethod === 'shake' && styles.sosOptionSelected,
              ]}
              onPress={() => setSosMethod('shake')}
            >
              <View style={styles.sosOptionContent}>
                <View style={styles.radioButton}>
                  {sosMethod === 'shake' && (
                    <View style={styles.radioButtonSelected} />
                  )}
                </View>
                <View style={styles.sosOptionTextContainer}>
                  <Text style={styles.sosOptionTitle}>Shake Phone</Text>
                  <Text style={styles.sosOptionSubtext}>
                    Shake device vigorously to activate
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sosOption,
                sosMethod === 'voice' && styles.sosOptionSelected,
              ]}
              onPress={() => setSosMethod('voice')}
            >
              <View style={styles.sosOptionContent}>
                <View style={styles.radioButton}>
                  {sosMethod === 'voice' && (
                    <View style={styles.radioButtonSelected} />
                  )}
                </View>
                <View style={styles.sosOptionTextContainer}>
                  <Text style={styles.sosOptionTitle}>Voice Command</Text>
                  <Text style={styles.sosOptionSubtext}>
                    Say "Emergency Help" to activate
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Emergency Contacts */}
        <View style={styles.section}>
          <View style={styles.emergencyHeader}>
            <Text style={styles.label}>Emergency Contacts (Minimum 2) *</Text>
            <TouchableOpacity
              style={styles.addContactButton}
              onPress={addEmergencyContact}
            >
              <Text style={styles.addContactButtonText}>+ Add Contact</Text>
            </TouchableOpacity>
          </View>

          {emergencyContacts.map((contact, index) => (
            <View key={index} style={styles.contactCard}>
              <View style={styles.contactHeader}>
                <Text style={styles.contactNumber}>Contact {index + 1}</Text>
                {emergencyContacts.length > 2 && (
                  <TouchableOpacity
                    onPress={() => removeEmergencyContact(index)}
                  >
                    <Text style={styles.removeContactText}>Remove</Text>
                  </TouchableOpacity>
                )}
              </View>

              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={contact.name}
                onChangeText={value =>
                  updateEmergencyContact(index, 'name', value)
                }
                placeholderTextColor="#9AA6B8"
              />

              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={contact.phone}
                onChangeText={value =>
                  updateEmergencyContact(index, 'phone', value)
                }
                keyboardType="phone-pad"
                placeholderTextColor="#9AA6B8"
              />

              <TextInput
                style={styles.input}
                placeholder="Relationship (e.g., Mother, Friend)"
                value={contact.relationship}
                onChangeText={value =>
                  updateEmergencyContact(index, 'relationship', value)
                }
                placeholderTextColor="#9AA6B8"
              />
            </View>
          ))}
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  formContainer: {
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
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B344B',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E4F2FB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#2B344B',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  photoUploadContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E4F2FB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#9AA6B8',
    borderStyle: 'dashed',
  },
  photoPlaceholderIcon: {
    fontSize: 60,
    color: '#9AA6B8',
  },
  photoPlaceholderText: {
    fontSize: 40,
    marginBottom: 5,
  },
  photoPlaceholderSubtext: {
    fontSize: 12,
    color: '#5F6E7D',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  photoButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  photoButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#1DB9A0',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  photoButtonText: {
    color: '#1DB9A0',
    fontSize: 14,
    fontWeight: '600',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E4F2FB',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
  genderButtonSelected: {
    backgroundColor: '#1DB9A0',
    borderColor: '#1DB9A0',
  },
  genderButtonText: {
    fontSize: 16,
    color: '#2B344B',
  },
  genderButtonTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  sosContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E4F2FB',
  },
  sosDescription: {
    fontSize: 14,
    color: '#5F6E7D',
    marginBottom: 16,
    textAlign: 'center',
  },
  sosOption: {
    backgroundColor: '#F0F4F8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#E4F2FB',
  },
  sosOptionSelected: {
    backgroundColor: '#E8F6F4',
    borderColor: '#1DB9A0',
  },
  sosOptionContent: {
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
  sosOptionTextContainer: {
    flex: 1,
  },
  sosOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B344B',
    marginBottom: 2,
  },
  sosOptionSubtext: {
    fontSize: 13,
    color: '#5F6E7D',
  },
  sosToggle: {
    backgroundColor: '#F0F4F8',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  sosToggleActive: {
    backgroundColor: '#1DB9A0',
  },
  sosToggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  emergencyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addContactButton: {
    backgroundColor: '#1DB9A0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addContactButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  contactCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E4F2FB',
  },
  contactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B344B',
  },
  removeContactText: {
    color: '#E63946',
    fontSize: 14,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#1DB9A0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileForm;
