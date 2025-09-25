import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CharacterCard({ character, toggleRecruit, removeCharacter }) {
  return (
    <View style={styles.scrollContainer}>
      <View style={styles.scrollTop} />
      
      <View style={styles.parchment}>
        <View style={styles.parchmentHeader}>
          <MaterialCommunityIcons name="scroll-text" size={20} color="#8B4513" />
          <Text style={styles.scrollTitle}>PERGAMINHO DO AVENTUREIRO</Text>
          <MaterialCommunityIcons name="seal" size={18} color="#8B0000" />
        </View>
        
        <View style={styles.content}>
          <View style={styles.profileSection}>
            <View style={styles.portrait}>
              <MaterialCommunityIcons name="account-circle" size={48} color="#8B4513" />
            </View>
            
            <View style={styles.infoSection}>
              <Text style={styles.name}>{character.name}</Text>
              <View style={styles.ornamentLine} />
              
              <Text style={styles.description}>"{character.description}"</Text>
              
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <MaterialCommunityIcons name="shield" size={16} color="#8B0000" />
                  <Text style={styles.statLabel}>Classe:</Text>
                  <Text style={styles.statValue}>{character.classe}</Text>
                </View>
                
                <View style={styles.statItem}>
                  <MaterialCommunityIcons name="account-group" size={16} color="#8B0000" />
                  <Text style={styles.statLabel}>Raça:</Text>
                  <Text style={styles.statValue}>{character.elemento}</Text>
                </View>
                
                <View style={styles.statItem}>
                  <MaterialCommunityIcons name="star" size={16} color="#8B0000" />
                  <Text style={styles.statLabel}>Nível:</Text>
                  <Text style={styles.statValue}>{character.nex}</Text>
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.actionSection}>
            <TouchableOpacity onPress={() => toggleRecruit(character)} style={styles.actionButton}>
              <MaterialCommunityIcons
                name={character.recruited ? "crown" : "sword-cross"}
                size={28}
                color={character.recruited ? "#228B22" : "#8B0000"}
              />
              <Text style={[styles.actionText, {color: character.recruited ? "#228B22" : "#8B0000"}]}>
                {character.recruited ? "EM MISSÃO" : "RECRUTAR"}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => removeCharacter(character)} style={styles.removeButton}>
              <MaterialCommunityIcons name="close-circle" size={24} color="#8B0000" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.parchmentFooter}>
          <View style={styles.waxSeal}>
            <MaterialCommunityIcons name="circle" size={24} color="#8B0000" />
          </View>
        </View>
      </View>
      
      <View style={styles.scrollBottom} />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  scrollTop: {
    width: 60,
    height: 15,
    backgroundColor: '#8B4513',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#654321',
  },
  parchment: {
    backgroundColor: '#F4E4BC',
    borderRadius: 0,
    borderWidth: 3,
    borderColor: '#8B4513',
    width: '95%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
    position: 'relative',
  },
  parchmentHeader: {
    backgroundColor: '#8B4513',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#654321',
  },
  scrollTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#F5DEB3',
    textAlign: 'center',
    marginHorizontal: 8,
    letterSpacing: 1,
  },
  content: {
    padding: 16,
  },
  profileSection: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  portrait: {
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoSection: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B0000',
    marginBottom: 4,
    textShadowColor: '#F5DEB3',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  ornamentLine: {
    height: 2,
    backgroundColor: '#D4A574',
    marginBottom: 8,
    borderRadius: 1,
  },
  description: {
    fontSize: 14,
    color: '#8B4513',
    fontStyle: 'italic',
    marginBottom: 12,
    lineHeight: 18,
  },
  statsContainer: {
    gap: 6,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8B4513',
    minWidth: 50,
  },
  statValue: {
    fontSize: 14,
    color: '#654321',
    fontWeight: '600',
  },
  actionSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#D4A574',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5DEB3',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#8B4513',
    gap: 6,
  },
  actionText: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  removeButton: {
    padding: 8,
  },
  parchmentFooter: {
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#D4A574',
  },
  waxSeal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollBottom: {
    width: 60,
    height: 15,
    backgroundColor: '#8B4513',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#654321',
  },
});