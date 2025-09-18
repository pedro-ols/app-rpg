import React, { useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import { Picker } from '@react-native-picker/picker';

const CLASSES = ["Sobrevivente", "Combatente", "Ocultista", "Especialista"];
const ELEMENTOS = ["Sangue", "Morte", "Medo", "Energia", "Conhecimento"];
const NEX_OPTIONS = Array.from({length: 21}, (_, i) => `${i*5}%`);

export default function AddCharacterForm({ newCharacter, setNewCharacter, description, setDescription, classe, setClasse, elemento, setElemento, nex, setNex, addCharacter, error }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.1, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start();
  };

  return (
    <View style={styles.formBox}>
      <TextInput
        mode="outlined"
        label="Nome do personagem"
        value={newCharacter}
        onChangeText={setNewCharacter}
        style={styles.input}
        theme={{ colors: { primary: '#d32f2f' } }}
      />
      <TextInput
        mode="outlined"
        label="Descrição"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        theme={{ colors: { primary: '#d32f2f' } }}
      />
      <View style={styles.row}>
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={classe}
            onValueChange={setClasse}
            style={styles.picker}
            dropdownIconColor="#d32f2f"
          >
            <Picker.Item label="Classe" value="" color="#888" />
            {CLASSES.map(c => <Picker.Item key={c} label={c} value={c} />)}
          </Picker>
        </View>
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={elemento}
            onValueChange={setElemento}
            style={styles.picker}
            dropdownIconColor="#d32f2f"
          >
            <Picker.Item label="Elemento" value="" color="#888" />
            {ELEMENTOS.map(e => <Picker.Item key={e} label={e} value={e} />)}
          </Picker>
        </View>
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={nex}
            onValueChange={setNex}
            style={styles.picker}
            dropdownIconColor="#d32f2f"
          >
            <Picker.Item label="NEX" value="" color="#888" />
            {NEX_OPTIONS.map(n => <Picker.Item key={n} label={n} value={n} />)}
          </Picker>
        </View>
      </View>
      <HelperText type="error" visible={!!error}>{error}</HelperText>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Button
          mode="contained"
          onPress={() => { animateButton(); addCharacter(); }}
          style={styles.button}
          labelStyle={{ fontWeight: 'bold', fontSize: 18 }}
          buttonColor="#d32f2f"
        >
          Adicionar
        </Button>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  formBox: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    color: '#fff',
    padding: 16,
    marginBottom: 24,
    shadowColor: '#d32f2f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#fff',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  pickerBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 2,
    overflow: 'hidden',
  },
  picker: {
    color: '#000',
    backgroundColor: '#fff',
    height: 44,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 8,
    borderRadius: 12,
    shadowColor: '#d32f2f',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
});