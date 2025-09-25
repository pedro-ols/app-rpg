import React, { useState } from "react";
import { SafeAreaView, FlatList, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Header from "./src/components/Header";
import AddCharacterForm from "./src/components/AddCharacterForm";
import CharacterCard from "./src/components/CharacterCard";
import ConfirmationDialog from "./src/components/ConfirmationDialog";
import FilterBar from "./src/components/FilterBar";
import SearchBar from "./src/components/SearchBar";
import ToastNotification from "./src/components/ToastNotification";

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
  const [toast, setToast] = useState({ visible: false, message: "", type: "info" });
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState("");
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
    showToast(
      `${character.name} ${character.recruited ? "saiu da aventura" : "juntou-se à aventura"}!`, 
      character.recruited ? "warning" : "success"
    );
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
    showToast(`${newChar.name} chegou à taverna!`, "success");
  }

  function removeCharacter(character) {
    setRemoveModal({ visible: true, character });
  }

  function confirmRemoveCharacter() {
    const character = removeModal.character;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCharacters(characters.filter((char) => char.id !== character.id));
    setRemoveModal({ visible: false, character: null });
    showToast(`${character.name} foi banido da taverna!`, "error");
  }

  function showToast(message, type = "info") {
    setToast({ visible: true, message, type });
  }

  function getFilteredCharacters() {
    let filtered = characters;
    
    // Aplicar filtro por status
    if (filter === 'recruited') filtered = filtered.filter(c => c.recruited);
    if (filter === 'available') filtered = filtered.filter(c => !c.recruited);
    
    // Aplicar busca por texto
    if (searchQuery.trim()) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.classe.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.elemento.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }

  function getCharactersCount() {
    return {
      all: characters.length,
      recruited: characters.filter(c => c.recruited).length,
      available: characters.filter(c => !c.recruited).length
    };
  }

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <SafeAreaView style={styles.container}>
          <Header title="🏰 A TAVERNA DO DRAGÃO DOURADO 🏰" subtitle="⚔️ Registro de Aventureiros • Clique para recrutar • Segure para banir ⚔️" />
          
          <FilterBar 
            filter={filter} 
            setFilter={setFilter} 
            charactersCount={getCharactersCount()} 
          />
          
          <SearchBar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />
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
          <ToastNotification
            visible={toast.visible}
            message={toast.message}
            type={toast.type}
            onDismiss={() => setToast({ ...toast, visible: false })}
          />
          <ConfirmationDialog
            visible={addModalVisible}
            onDismiss={() => setAddModalVisible(false)}
            onConfirm={confirmAddCharacter}
            title="🏰 ACEITAR NOVO AVENTUREIRO? 🏰"
            subtitle={`Nome: ${newCharacter}`}
            message="Este bravo aventureiro deseja se juntar à sua guilda!"
            confirmText="⚔️ ACEITAR"
            dismissText="❌ RECUSAR"
            type="success"
          />
          
          <ConfirmationDialog
            visible={removeModal.visible}
            onDismiss={() => setRemoveModal({ visible: false, character: null })}
            onConfirm={confirmRemoveCharacter}
            title="⚠️ BANIR AVENTUREIRO? ⚠️"
            subtitle={`Nome: ${removeModal.character?.name}`}
            message="Este aventureiro será permanentemente banido da taverna!"
            confirmText="⚔️ BANIR"
            dismissText="🛡️ PERDOAR"
            type="danger"
          />
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
});