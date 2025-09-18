import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Card } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CharacterCard({ character, toggleRecruit, removeCharacter }) {
  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <View style={styles.iconCol}>
          <MaterialCommunityIcons name="dice-multiple" size={32} color="#d32f2f" style={styles.icon} />
        </View>
        <View style={styles.infoCol}>
          <Text style={styles.name}>{character.name}</Text>
          <Text style={styles.desc}>{character.description}</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Classe: </Text>
            <Text style={styles.value}>{character.classe}</Text>
            <Text style={styles.label}>  |  Elemento: </Text>
            <Text style={styles.value}>{character.elemento}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>NEX: </Text>
            <Text style={styles.value}>{character.nex}</Text>
          </View>
        </View>
        <View style={styles.actionsCol}>
          <TouchableOpacity onPress={() => toggleRecruit(character)}>
            <MaterialCommunityIcons
              name={character.recruited ? "check-circle" : "plus-circle"}
              size={30}
              color={character.recruited ? "#43ea5e" : "#d32f2f"}
              style={styles.actionIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeCharacter(character)}>
            <MaterialCommunityIcons name="delete" size={28} color="#d32f2f" style={styles.actionIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#18181a',
    borderRadius: 18,
    marginBottom: 8,
    elevation: 8,
    shadowColor: '#d32f2f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderWidth: 2,
    borderColor: '#d32f2f',
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 10,
  },
  iconCol: {
    marginRight: 8,
    alignItems: 'center',
  },
  infoCol: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
    textShadowColor: '#d32f2f',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  desc: {
    color: '#f8b4b4',
    fontSize: 15,
    marginBottom: 2,
    fontStyle: 'italic',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
    flexWrap: 'wrap',
  },
  label: {
    color: '#d32f2f',
    fontWeight: 'bold',
    fontSize: 14,
  },
  value: {
    color: '#fff',
    fontSize: 14,
    marginRight: 8,
  },
  actionsCol: {
    marginLeft: 8,
    alignItems: 'center',
    gap: 8,
  },
  actionIcon: {
    marginVertical: 2,
  },
});