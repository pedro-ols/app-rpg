import React, { useState } from "react";
import { SafeAreaView, FlatList, StyleSheet, Alert } from "react-native";
import { Snackbar, Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Header from "./src/components/Header";
import AddCharacterForm from "./src/components/AddCharacterForm";
import CharacterCard from "./src/components/CharacterCard";

export default function App() {
  const [characters, setCharacters] = useState([
    { id: 1, name: "Gandalf o Mago", recruited: 0 },
    { id: 2, name: "Aragorn o Guerreiro", recruited: 1 },
    { id: 3, name: "Legolas o Arqueiro", recruited: 0 },
  ]);
  const [newCharacter, setNewCharacter] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  function toggleRecruit(character) {
    const updatedCharacters = characters.map((currentChar) => {
      if (currentChar.id === character.id) {
        return { ...currentChar, recruited: currentChar.recruited ? 0 : 1 };
      }
      return currentChar;
    });
    setCharacters(updatedCharacters);
    showSnackbar(`${character.name} foi ${character.recruited ? "dispensado" : "recrutado"}!`);
  }

  function addCharacter() {
    if (newCharacter.trim() === "") {
      Alert.alert("Erro", "O nome do personagem não pode estar vazio!");
      return;
    }
    const newId = characters.length > 0 ? characters[characters.length - 1].id + 1 : 1;
    const newChar = { id: newId, name: newCharacter, recruited: 0 };
    setCharacters([...characters, newChar]);
    setNewCharacter("");
    showSnackbar(`${newCharacter} foi adicionado!`);
  }

  function removeCharacter(character) {
    Alert.alert(
      "Remover Personagem",
      `Deseja remover ${character.name}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          onPress: () => {
            setCharacters(characters.filter((char) => char.id !== character.id));
            showSnackbar(`${character.name} foi removido!`);
          },
        },
      ]
    );
  }

  function showSnackbar(message) {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  }

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <SafeAreaView style={styles.container}>
          <Header title="Minha Party RPG" subtitle="Recrutado | Disponível | Segure para remover" />
          <AddCharacterForm
            newCharacter={newCharacter}
            setNewCharacter={setNewCharacter}
            addCharacter={addCharacter}
          />
          <FlatList
            data={characters}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <CharacterCard
                character={item}
                toggleRecruit={toggleRecruit}
                removeCharacter={removeCharacter}
              />
            )}
            style={styles.list}
          />
          <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            duration={3000}
          >
            {snackbarMessage}
          </Snackbar>
        </SafeAreaView>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  list: {
    flex: 1,
  },
});