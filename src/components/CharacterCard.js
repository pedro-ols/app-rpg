import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, IconButton } from "react-native-paper";

export default function CharacterCard({ character, toggleRecruit, removeCharacter }) {
  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <IconButton icon="dice-multiple" size={24} />
        <Text style={styles.text}>{character.name}</Text>
        <IconButton
          icon={character.recruited ? "check-circle" : "plus-circle"}
          onPress={() => toggleRecruit(character)}
        />
        <IconButton icon="delete" onPress={() => removeCharacter(character)} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
});