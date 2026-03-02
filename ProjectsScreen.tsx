import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '../state/store';

export default function ProjectsScreen() {
  const projects = useSelector((state: RootState) => state.projects.list);

  const renderProject = ({ item }: any) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <View style={[styles.badge, { backgroundColor: item.accuracy >= 98 ? '#2d6a4f' : '#4a3f2f' }]}>
          <Text style={styles.badgeText}>{item.accuracy}%</Text>
        </View>
      </View>
      <Text style={styles.cardType}>{item.type}</Text>
      <Text style={styles.cardDate}>{new Date(item.updatedAt).toLocaleDateString()}</Text>
      {item.accuracy >= 98 && (
        <TouchableOpacity style={styles.launchBtn}>
          <Text style={styles.launchText}>🚀 Launch to Legion Store</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={projects}
        renderItem={renderProject}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No Projects Yet</Text>
            <Text style={styles.emptyText}>
              Start a vibe-coding session in Chat to create your first project.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },
  list: { padding: 16 },
  card: {
    backgroundColor: '#13131f',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1e1e3a',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { color: '#fff', fontSize: 16, fontWeight: '700', flex: 1 },
  badge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  cardType: { color: '#7b5ea7', fontSize: 13, marginTop: 4 },
  cardDate: { color: '#555', fontSize: 12, marginTop: 4 },
  launchBtn: {
    backgroundColor: '#7b5ea7',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  launchText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  empty: { alignItems: 'center', paddingTop: 80, paddingHorizontal: 32 },
  emptyTitle: { color: '#fff', fontSize: 20, fontWeight: '700' },
  emptyText: { color: '#666', fontSize: 14, textAlign: 'center', marginTop: 8, lineHeight: 20 },
});
