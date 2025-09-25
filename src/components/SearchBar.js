import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar, Surface } from 'react-native-paper';

export default function SearchBar({ searchQuery, setSearchQuery, placeholder = "🔍 Buscar aventureiros..." }) {
  return (
    <Surface style={styles.container} elevation={4}>
      <Searchbar
        placeholder={placeholder}
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        inputStyle={styles.searchInput}
        iconColor="#8B4513"
        placeholderTextColor="#888"
        theme={{
          colors: {
            primary: '#8B4513',
            onSurfaceVariant: '#2C1810',
            surface: '#F4E4BC',
          }
        }}
        elevation={2}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: '#2C1810',
    borderWidth: 2,
    borderColor: '#8B4513',
    padding: 10,
  },
  searchbar: {
    backgroundColor: '#F4E4BC',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D4A574',
  },
  searchInput: {
    color: '#2C1810',
    fontSize: 16,
  },
});