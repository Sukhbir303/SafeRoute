import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';

const LocationConfirmModal = ({visible, onAccept, onReject, onClose}) => {
  const {colors} = useTheme();

  const handleOverlayPress = () => {
    if (onClose) {
      onClose();
    } else if (onReject) {
      onReject();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleOverlayPress}>
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={handleOverlayPress}>
        <TouchableOpacity
          style={[styles.modalContent, {backgroundColor: colors.deepNavy || colors.softWhite}]}
          activeOpacity={1}>
          <Text style={[styles.modalTitle, {color: colors.softWhite || colors.charcoal}]}>
            Use Current Location?
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, {backgroundColor: colors.tealGreen || colors.safeGreen}]}
              onPress={onAccept}
              activeOpacity={0.8}>
              <Text style={[styles.modalButtonText, {color: colors.softWhite}]}>
                Accept
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, {backgroundColor: colors.alertRed}]}
              onPress={onReject}
              activeOpacity={0.8}>
              <Text style={[styles.modalButtonText, {color: colors.softWhite}]}>
                Reject
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default LocationConfirmModal;
