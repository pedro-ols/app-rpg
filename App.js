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
    showSnackbar(`${character.name} ${character.recruited ? "saiu da aventura" : "juntou-se à aventura"}!`);
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
    showSnackbar(`${newChar.name} chegou à taverna!`);
  }

  function removeCharacter(character) {
    setRemoveModal({ visible: true, character });
  }

  function confirmRemoveCharacter() {
    const character = removeModal.character;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCharacters(characters.filter((char) => char.id !== character.id));
    setRemoveModal({ visible: false, character: null });
    showSnackbar(`${character.name} foi banido da taverna!`);
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
          <Header title="🏰 A TAVERNA DO DRAGÃO DOURADO 🏰" subtitle="⚔️ Registro de Aventureiros • Clique para recrutar • Segure para banir ⚔️" />
          
          <View style={styles.tavernSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>📜 SALÃO PRINCIPAL 📜</Text>
            </View>
            
            <View style={styles.filterRow}>
              <View style={styles.filterButton}>
                <Button title="🏛️ TODOS" onPress={() => setFilter('all')} color={filter==='all'? '#8B0000': '#654321'} />
              </View>
              <View style={styles.filterButton}>
                <Button title="⚔️ EM AVENTURA" onPress={() => setFilter('recruited')} color={filter==='recruited'? '#8B0000': '#654321'} />
              </View>
              <View style={styles.filterButton}>
                <Button title="🍺 NA TAVERNA" onPress={() => setFilter('available')} color={filter==='available'? '#8B0000': '#654321'} />
              </View>
            </View>
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
            style={{ backgroundColor: '#8B4513' }}
          >
            {snackbarMessage}
          </Snackbar>
          {addModalVisible && (
            <View style={styles.modalOverlay}>
              <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>🏰 ACEITAR NOVO AVENTUREIRO? 🏰</Text>
                <Text style={styles.modalSubtitle}>Nome: {newCharacter}</Text>
                <Text style={styles.modalText}>Este bravo aventureiro deseja se juntar à sua guilda!</Text>
                <View style={styles.modalButtons}>
                  <Button title="❌ RECUSAR" onPress={() => setAddModalVisible(false)} color="#8B4513" />
                  <Button title="⚔️ ACEITAR" onPress={confirmAddCharacter} color="#8B0000" />
                </View>
              </View>
            </View>
          )}
          {removeModal.visible && (
            <View style={styles.modalOverlay}>
              <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>⚠️ BANIR AVENTUREIRO? ⚠️</Text>
                <Text style={styles.modalSubtitle}>Nome: {removeModal.character?.name}</Text>
                <Text style={styles.modalText}>Este aventureiro será permanentemente banido da taverna!</Text>
                <View style={styles.modalButtons}>
                  <Button title="🛡️ PERDOAR" onPress={() => setRemoveModal({ visible: false, character: null })} color="#8B4513" />
                  <Button title="⚔️ BANIR" onPress={confirmRemoveCharacter} color="#8B0000" />
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
    backgroundColor: "#1A0E0A",
    padding: 15,
  },
  list: {
    flex: 1,
  },
  tavernSection: {
    backgroundColor: '#2C1810',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#8B4513',
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 10,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#D4A574',
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F5DEB3',
    letterSpacing: 2,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  filterButton: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D4A574',
    backgroundColor: '#3D2817',
    overflow: 'hidden',
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
    backgroundColor: '#F4E4BC',
    borderRadius: 15,
    padding: 25,
    minWidth: 320,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 15,
    borderWidth: 4,
    borderColor: '#8B4513',
    position: 'relative',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B0000',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 1,
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 14,
    color: '#654321',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
});