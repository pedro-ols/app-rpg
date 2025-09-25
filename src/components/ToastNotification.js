import React from 'react';
import { Portal, Snackbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function ToastNotification({ 
  visible, 
  message, 
  onDismiss, 
  type = 'info', 
  duration = 3000,
  actionLabel,
  onActionPress 
}) {
  const getStyle = () => {
    switch (type) {
      case 'success':
        return { backgroundColor: '#2E7D32' };
      case 'error':
        return { backgroundColor: '#B71C1C' };
      case 'warning':
        return { backgroundColor: '#F57C00' };
      case 'info':
      default:
        return { backgroundColor: '#8B4513' };
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return '🏰';
    }
  };

  return (
    <Portal>
      <Snackbar
        visible={visible}
        onDismiss={onDismiss}
        duration={duration}
        style={[styles.snackbar, getStyle()]}
        action={actionLabel ? {
          label: actionLabel,
          onPress: onActionPress,
          textColor: '#F5DEB3'
        } : undefined}
        wrapperStyle={styles.wrapper}
      >
        {getIcon()} {message}
      </Snackbar>
    </Portal>
  );
}

const styles = StyleSheet.create({
  snackbar: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D4A574',
  },
  wrapper: {
    bottom: 90, // Para não sobrepor outros elementos
  },
});