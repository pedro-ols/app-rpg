import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";

export default function AddCharacterForm({ newCharacter, setNewCharacter, addCharacter }) {
  return (
    <View style={styles.inputRow}>
      <TextInput
        mode="outlined"
        label="Nome do novo personagem"
        value={newCharacter}
        onChangeText={setNewCharacter}
        style={styles.input}
      />
      <Button mode="contained" onPress={addCharacter} style={styles.button}>
        Adicionar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  button: {
    justifyContent: "center",
  },
});