import React, { useState } from "react";
import { SafeAreaView, FlatList, StyleSheet, Alert, View, Button, LayoutAnimation, Platform, UIManager, Text } from "react-native";
import { Snackbar, Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Header from "./src/components/Header";
import AddCharacterForm from "./src/components/AddCharacterForm";
import CharacterCard from "./src/components/CharacterCard";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [newCharacter, setNewCharacter] = useState("");
  const [description, setDescription] = useState("");
  const [classe, setClasse] = useState("");
  const [elemento, setElemento] = useState("");
  const [nex, setNex] = useState("");
  const [formError, setFormError] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [filter, setFilter] = useState('all');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [removeModal, setRemoveModal] = useState({ visible: false, character: null });

  function toggleRecruit(character) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
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
    if (!newCharacter.trim() || !classe || !elemento || !nex) {
      setFormError("Preencha todos os campos obrigatórios!");
      return;
    }
    setFormError("");
    setAddModalVisible(true);
  }

  function confirmAddCharacter() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const newId = characters.length > 0 ? characters[characters.length - 1].id + 1 : 1;
    const newChar = {
      id: newId,
      name: newCharacter,
      description,
      classe,
      elemento,
      nex,
      recruited: 0
    };
    setCharacters([...characters, newChar]);
    setNewCharacter("");
    setDescription("");
    setClasse("");
    setElemento("");
    setNex("");
    setAddModalVisible(false);
    showSnackbar(`${newChar.name} foi adicionado!`);
  }

  function removeCharacter(character) {
    setRemoveModal({ visible: true, character });
  }

  function confirmRemoveCharacter() {
    const character = removeModal.character;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCharacters(characters.filter((char) => char.id !== character.id));
    setRemoveModal({ visible: false, character: null });
    showSnackbar(`${character.name} foi removido!`);
  }

  function showSnackbar(message) {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  }

  function getFilteredCharacters() {
    if (filter === 'recruited') return characters.filter(c => c.recruited);
    if (filter === 'available') return characters.filter(c => !c.recruited);
    return characters;
  }

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <SafeAreaView style={styles.container}>
          <Header title="Minha Party RPG" subtitle="Recrutado | Disponível | Segure para remover" />
          <View style={styles.filterRow}>
            <Button title="Todos" onPress={() => setFilter('all')} color={filter==='all'? '#d32f2f': '#222'} />
            <Button title="Recrutados" onPress={() => setFilter('recruited')} color={filter==='recruited'? '#d32f2f': '#222'} />
            <Button title="Disponíveis" onPress={() => setFilter('available')} color={filter==='available'? '#d32f2f': '#222'} />
          </View>
          <AddCharacterForm
            newCharacter={newCharacter}
            setNewCharacter={setNewCharacter}
            description={description}
            setDescription={setDescription}
            classe={classe}
            setClasse={setClasse}
            elemento={elemento}
            setElemento={setElemento}
            nex={nex}
            setNex={setNex}
            addCharacter={addCharacter}
            error={formError}
          />
          <FlatList
            data={getFilteredCharacters()}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <CharacterCard
                character={item}
                toggleRecruit={toggleRecruit}
                removeCharacter={removeCharacter}
              />
            )}
            style={styles.list}
            contentContainerStyle={{ gap: 18, paddingBottom: 40 }}
          />
          <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            duration={3000}
            style={{ backgroundColor: '#d32f2f' }}
          >
            {snackbarMessage}
          </Snackbar>
          {addModalVisible && (
            <View style={styles.modalOverlay}>
              <View style={styles.modalBox}>
                <Text style={{ fontSize: 20, marginBottom: 10, color: '#d32f2f', fontWeight: 'bold' }}>Adicionar personagem?</Text>
                <Text style={{ marginBottom: 20, color: '#fff' }}>{newCharacter}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
                  <Button title="Cancelar" onPress={() => setAddModalVisible(false)} color="#888" />
                  <Button title="Adicionar" onPress={confirmAddCharacter} color="#d32f2f" />
                </View>
              </View>
            </View>
          )}
          {removeModal.visible && (
            <View style={styles.modalOverlay}>
              <View style={styles.modalBox}>
                <Text style={{ fontSize: 20, marginBottom: 10, color: '#d32f2f', fontWeight: 'bold' }}>Deseja mesmo remover esse personagem?</Text>
                <Text style={{ marginBottom: 20, color: '#fff' }}>{removeModal.character?.name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
                  <Button title="Cancelar" onPress={() => setRemoveModal({ visible: false, character: null })} color="#888" />
                  <Button title="Remover" onPress={confirmRemoveCharacter} color="#d32f2f" />
                </View>
              </View>
            </View>
          )}
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
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 18,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modalBox: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 28,
    minWidth: 270,
    elevation: 8,
    shadowColor: '#d32f2f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
});