import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Card } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CharacterCard({ character, toggleRecruit, removeCharacter }) {
  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <View style={styles.iconCol}>
          <MaterialCommunityIcons name="cards-playing-spade-multiple" size={36} color="#FFD700" style={styles.icon} />
        </View>
        <View style={styles.infoCol}>
          <Text style={styles.name}>{character.name}</Text>
          <Text style={styles.desc}>{character.description}</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Classe: </Text>
            <Text style={styles.value}>{character.classe}</Text>
            <Text style={styles.label}>  |  Raça: </Text>
            <Text style={styles.value}>{character.elemento}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Nível: </Text>
            <Text style={styles.value}>{character.nex}</Text>
          </View>
        </View>
        <View style={styles.actionsCol}>
          <TouchableOpacity onPress={() => toggleRecruit(character)}>
            <MaterialCommunityIcons
              name={character.recruited ? "crown" : "sword-cross"}
              size={32}
              color={character.recruited ? "#32CD32" : "#DAA520"}
              style={styles.actionIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeCharacter(character)}>
            <MaterialCommunityIcons name="delete" size={28} color="#B22222" style={styles.actionIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2F1B69',
    borderRadius: 20,
    marginBottom: 15,
    elevation: 15,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    borderWidth: 4,
    borderColor: '#DAA520',
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
    fontSize: 24,
    fontWeight: '900',
    color: '#FFD700',
    marginBottom: 4,
    textShadowColor: '#4B0082',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    letterSpacing: 1,
  },
  desc: {
    color: '#E6E6FA',
    fontSize: 16,
    marginBottom: 6,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
    flexWrap: 'wrap',
  },
  label: {
    color: '#DAA520',
    fontWeight: 'bold',
    fontSize: 15,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  value: {
    color: '#FFFFFF',
    fontSize: 15,
    marginRight: 8,
    fontWeight: '600',
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