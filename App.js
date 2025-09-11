import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Animated,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [characters, setCharacters] = useState([
    { id: 1, name: "🧙‍♂️ Gandalf o Mago", recruited: 0 },
    { id: 2, name: "⚔️ Aragorn o Guerreiro", recruited: 1 },
    { id: 3, name: "🏹 Legolas o Arqueiro", recruited: 0 },
  ]);

  const [newCharacter, setNewCharacter] = useState("");

  // Recrutar/dispensar personagem
  function toggleRecruit(character) {
    const newCharacters = characters.map((currentChar) => {
      if (currentChar.id === character.id) {
        return {
          ...currentChar,
          recruited: currentChar.recruited ? 0 : 1,
        };
      }
      return currentChar;
    });
    setCharacters(newCharacters);
  }

  // Adicionar novo personagem
  function addCharacter() {
    if (newCharacter.trim() === "") {
      Alert.alert("Erro", "O nome do personagem não pode estar vazio!");
      return;
    }

    const newId = characters.length > 0 ? characters[characters.length - 1].id + 1 : 1;
    const newChar = { id: newId, name: newCharacter, recruited: 0 };
    setCharacters([...characters, newChar]);
    setNewCharacter("");
  }

  // Renderizar personagem
  function renderCharacter({ item }) {
    const scaleValue = new Animated.Value(1);

    const handlePressIn = () => {
      Animated.spring(scaleValue, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View style={[styles.character, { transform: [{ scale: scaleValue }] }]}>
        <TouchableOpacity
          style={styles.characterContent}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => toggleRecruit(item)}
          onLongPress={() =>
            Alert.alert(
              "Remover Personagem",
              `Deseja remover ${item.name}?`,
              [
                { text: "Cancelar", style: "cancel" },
                {
                  text: "Remover",
                  onPress: () =>
                    setCharacters(characters.filter((char) => char.id !== item.id)),
                },
              ]
            )
          }
        >
          <Text style={styles.diceIcon}>🎲</Text>
          <Text style={styles.characterText}>{item.name}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Minha Party RPG</Text>
      <Text style={styles.subtitle}>Recrutado | Disponível | Segure para remover</Text>

      {/* Campo para adicionar personagem */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Nome do novo personagem"
          value={newCharacter}
          onChangeText={setNewCharacter}
          onSubmitEditing={addCharacter}
        />
        <TouchableOpacity style={styles.button} onPress={addCharacter}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de personagens */}
      <FlatList
        data={characters}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderCharacter}
        style={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#000",
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    color: "#000",
  },
  button: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  list: {
    flex: 1,
  },
  character: {
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // Para sombra no Android
  },
  characterContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  diceIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  characterText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});