import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';

const MOCK_STORE_ITEMS = [
  { id: '1', name: 'Neon Drift Racer', type: 'Game', price: 2.99, rating: 4.8, downloads: 1240, creator: 'XDevMike' },
  { id: '2', name: 'Budget Tracker Pro', type: 'App', price: 0, rating: 4.5, downloads: 3800, creator: 'SarahBuilds' },
  { id: '3', name: 'Cosmic Dungeon', type: 'Game', price: 4.99, rating: 4.9, downloads: 892, creator: 'ProducerJ' },
  { id: '4', name: 'Synthwave Vibes Vol.1', type: 'Movie', price: 1.99, rating: 4.7, downloads: 560, creator: 'AudioWave' },
];

export default function StoreScreen() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Games', 'Apps', 'Movies'];

  const filtered = MOCK_STORE_ITEMS.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || item.type === filter.slice(0, -1);
    return matchSearch && matchFilter;
  });

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.iconPlaceholder}>
          <Text style={styles.iconText}>{item.type === 'Game' ? '🎮' : item.type === 'App' ? '📱' : '🎬'}</Text>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardName}>{item.name}</Text>
          <Text style={styles.cardCreator}>by {item.creator}</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.ratingText}>⭐ {item.rating}</Text>
            <Text style={styles.downloadsText}> · {item.downloads} installs</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardBottom}>
        <Text style={[styles.typeBadge]}>{item.type}</Text>
        <TouchableOpacity style={styles.getBtn}>
          <Text style={styles.getBtnText}>{item.price === 0 ? 'FREE' : `$${item.price}`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        value={search}
        onChangeText={setSearch}
        placeholder="Search Legion Store..."
        placeholderTextColor="#555"
      />
      <View style={styles.filterRow}>
        {filters.map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filter === f && styles.filterActive]}
            onPress={() => setFilter(f)}>
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filtered}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },
  search: {
    backgroundColor: '#13131f',
    color: '#fff',
    margin: 16,
    marginBottom: 8,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#1e1e3a',
  },
  filterRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 8, marginBottom: 8 },
  filterBtn: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: '#13131f', borderWidth: 1, borderColor: '#1e1e3a' },
  filterActive: { backgroundColor: '#7b5ea7', borderColor: '#7b5ea7' },
  filterText: { color: '#888', fontSize: 13 },
  filterTextActive: { color: '#fff', fontWeight: '700' },
  list: { padding: 16, gap: 12 },
  card: { backgroundColor: '#13131f', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#1e1e3a' },
  cardTop: { flexDirection: 'row', gap: 12 },
  iconPlaceholder: { width: 56, height: 56, backgroundColor: '#1e1e3a', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  iconText: { fontSize: 24 },
  cardInfo: { flex: 1 },
  cardName: { color: '#fff', fontSize: 15, fontWeight: '700' },
  cardCreator: { color: '#666', fontSize: 12, marginTop: 2 },
  ratingRow: { flexDirection: 'row', marginTop: 4 },
  ratingText: { color: '#f0c040', fontSize: 12 },
  downloadsText: { color: '#555', fontSize: 12 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  typeBadge: { color: '#7b5ea7', fontSize: 12, fontWeight: '600' },
  getBtn: { backgroundColor: '#7b5ea7', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 8 },
  getBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
});
