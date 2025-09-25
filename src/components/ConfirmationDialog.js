import React from 'react';
import { Portal, Dialog, Button, Paragraph, Title } from 'react-native-paper';

export default function ConfirmationDialog({ 
  visible, 
  onDismiss, 
  onConfirm, 
  title, 
  subtitle, 
  message, 
  confirmText, 
  dismissText,
  type = 'default' 
}) {
  const getColors = () => {
    switch (type) {
      case 'danger':
        return { confirmColor: '#B71C1C', dismissColor: '#8B4513' };
      case 'success':
        return { confirmColor: '#2E7D32', dismissColor: '#8B4513' };
      default:
        return { confirmColor: '#8B0000', dismissColor: '#8B4513' };
    }
  };

  const colors = getColors();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title style={{ color: '#8B0000', textAlign: 'center', fontSize: 18 }}>
          {title}
        </Dialog.Title>
        {subtitle && (
          <Dialog.Content>
            <Title style={{ color: '#8B4513', textAlign: 'center', fontSize: 16 }}>
              {subtitle}
            </Title>
            <Paragraph style={{ color: '#654321', textAlign: 'center', fontStyle: 'italic', marginTop: 8 }}>
              {message}
            </Paragraph>
          </Dialog.Content>
        )}
        <Dialog.Actions style={{ justifyContent: 'space-around', paddingHorizontal: 20 }}>
          <Button 
            onPress={onDismiss} 
            buttonColor={colors.dismissColor}
            textColor="#F5DEB3"
            mode="contained"
            style={{ minWidth: 100 }}
          >
            {dismissText}
          </Button>
          <Button 
            onPress={onConfirm} 
            buttonColor={colors.confirmColor}
            textColor="#F5DEB3"
            mode="contained"
            style={{ minWidth: 100 }}
          >
            {confirmText}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}