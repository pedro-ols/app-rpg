import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip, Surface, Title } from 'react-native-paper';

export default function FilterBar({ filter, setFilter, charactersCount }) {
  const filters = [
    { key: 'all', label: '🏛️ TODOS', icon: 'castle', count: charactersCount.all },
    { key: 'recruited', label: '⚔️ EM AVENTURA', icon: 'sword-cross', count: charactersCount.recruited },
    { key: 'available', label: '🍺 NA TAVERNA', icon: 'glass-mug-variant', count: charactersCount.available }
  ];

  return (
    <Surface style={styles.container} elevation={4}>
      <Title style={styles.title}>📜 SALÃO PRINCIPAL 📜</Title>
      <View style={styles.filterRow}>
        {filters.map((filterOption) => (
          <Chip
            key={filterOption.key}
            mode={filter === filterOption.key ? 'flat' : 'outlined'}
            selected={filter === filterOption.key}
            onPress={() => setFilter(filterOption.key)}
            style={[
              styles.chip,
              filter === filterOption.key ? styles.selectedChip : styles.unselectedChip
            ]}
            textStyle={[
              styles.chipText,
              filter === filterOption.key ? styles.selectedText : styles.unselectedText
            ]}
            showSelectedCheck={false}
            icon={filterOption.icon}
          >
            {filterOption.label} ({filterOption.count})
          </Chip>
        ))}
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2C1810',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#8B4513',
    marginBottom: 20,
    padding: 15,
    elevation: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F5DEB3',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#D4A574',
    paddingBottom: 10,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  chip: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 2,
  },
  selectedChip: {
    backgroundColor: '#8B0000',
    borderColor: '#D4A574',
  },
  unselectedChip: {
    backgroundColor: '#3D2817',
    borderColor: '#D4A574',
  },
  chipText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  selectedText: {
    color: '#F5DEB3',
  },
  unselectedText: {
    color: '#D4A574',
  },
});