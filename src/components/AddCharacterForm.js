import React, { useRef } from "react";
import { View, StyleSheet, Animated, Text } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CLASSES = ["Guerreiro", "Mago", "Ladino", "Clérigo", "Paladino", "Bárbaro", "Ranger", "Bardo"];
const RACAS = ["Humano", "Elfo", "Anão", "Halfling", "Meio-Elfo", "Meio-Orc", "Gnomo", "Draconato", "Tiefling"];
const NIVEIS = Array.from({length: 20}, (_, i) => `${i+1}`);

export default function AddCharacterForm({ newCharacter, setNewCharacter, description, setDescription, classe, setClasse, elemento, setElemento, nex, setNex, addCharacter, error }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.1, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start();
  };

  return (
    <View style={styles.bookContainer}>
      <View style={styles.bookHeader}>
        <MaterialCommunityIcons name="book-open-page-variant" size={24} color="#8B4513" />
        <Text style={styles.bookTitle}>📖 LIVRO DE REGISTROS DOS AVENTUREIROS 📖</Text>
        <MaterialCommunityIcons name="quill" size={24} color="#8B4513" />
      </View>
      
      <View style={styles.pageLeft}>
        <View style={styles.pageContent}>
          <Text style={styles.fieldLabel}>⚔️ Nome do Bravo Aventureiro:</Text>
          <TextInput
            mode="outlined"
            value={newCharacter}
            onChangeText={setNewCharacter}
            style={styles.input}
            theme={{ colors: { primary: '#8B4513', text: '#2C1810' } }}
          />
          
          <Text style={styles.fieldLabel}>📜 História e Feitos:</Text>
          <TextInput
            mode="outlined"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            multiline={true}
            numberOfLines={2}
            theme={{ colors: { primary: '#8B4513', text: '#2C1810' } }}
          />
        </View>
      </View>
      
      <View style={styles.pageRight}>
        <View style={styles.pageContent}>
          <Text style={styles.fieldLabel}>🛡️ Classe de Combate:</Text>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={classe}
              onValueChange={setClasse}
              style={styles.picker}
              dropdownIconColor="#8B4513"
            >
              <Picker.Item label="Escolha a Classe..." value="" color="#888" />
              {CLASSES.map(c => <Picker.Item key={c} label={c} value={c} />)}
            </Picker>
          </View>
          
          <Text style={styles.fieldLabel}>🧝 Raça de Origem:</Text>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={elemento}
              onValueChange={setElemento}
              style={styles.picker}
              dropdownIconColor="#8B4513"
            >
              <Picker.Item label="Escolha a Raça..." value="" color="#888" />
              {RACAS.map(r => <Picker.Item key={r} label={r} value={r} />)}
            </Picker>
          </View>
          
          <Text style={styles.fieldLabel}>⭐ Nível de Experiência:</Text>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={nex}
              onValueChange={setNex}
              style={styles.picker}
              dropdownIconColor="#8B4513"
            >
              <Picker.Item label="Escolha o Nível..." value="" color="#888" />
              {NIVEIS.map(n => <Picker.Item key={n} label={n} value={n} />)}
            </Picker>
          </View>
        </View>
      </View>
      
      <View style={styles.bookFooter}>
        <HelperText type="error" visible={!!error} style={styles.errorText}>{error}</HelperText>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Button
            mode="contained"
            onPress={() => { animateButton(); addCharacter(); }}
            style={styles.registerButton}
            labelStyle={styles.buttonLabel}
            buttonColor="#8B0000"
            icon="account-plus"
          >
            🏰 REGISTRAR AVENTUREIRO 🏰
          </Button>
        </Animated.View>
        
        <View style={styles.sealContainer}>
          <MaterialCommunityIcons name="seal" size={32} color="#8B4513" />
          <Text style={styles.sealText}>SELO DA TAVERNA</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bookContainer: {
    backgroundColor: '#F4E4BC',
    borderRadius: 0,
    marginBottom: 25,
    borderWidth: 6,
    borderColor: '#8B4513',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 15,
    elevation: 12,
    position: 'relative',
  },
  bookHeader: {
    backgroundColor: '#8B4513',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 3,
    borderBottomColor: '#654321',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F5DEB3',
    textAlign: 'center',
    marginHorizontal: 10,
    letterSpacing: 1,
  },
  pageLeft: {
    backgroundColor: '#FFF8DC',
    borderRightWidth: 2,
    borderRightColor: '#D2B48C',
    padding: 20,
  },
  pageRight: {
    backgroundColor: '#FFF8DC',
    padding: 20,
  },
  pageContent: {
    gap: 15,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 5,
    textShadowColor: '#F5DEB3',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  input: {
    backgroundColor: '#FFFEF7',
    borderWidth: 2,
    borderColor: '#D2B48C',
    borderRadius: 8,
    fontSize: 15,
    fontWeight: '500',
  },
  pickerBox: {
    backgroundColor: '#FFFEF7',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D2B48C',
    overflow: 'hidden',
  },
  picker: {
    color: '#8B4513',
    backgroundColor: 'transparent',
    height: 44,
    fontWeight: '600',
  },
  bookFooter: {
    backgroundColor: '#F4E4BC',
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 3,
    borderTopColor: '#8B4513',
  },
  errorText: {
    color: '#8B0000',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  registerButton: {
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#D4A574',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
    paddingVertical: 5,
  },
  buttonLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  sealContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  sealText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#8B4513',
    marginTop: 5,
    letterSpacing: 1,
  },
});