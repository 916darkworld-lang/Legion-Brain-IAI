import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const MAX_WINDOWS = 8;
const MOCK_WINDOWS = [
  { id: 1, ai: 'Claude 4 Opus', status: 'active', task: 'Writing game logic...' },
  { id: 2, ai: 'Gemini 2.5 Pro', status: 'active', task: 'Generating 3D assets...' },
  { id: 3, ai: 'Grok-3', status: 'thinking', task: 'Optimizing physics...' },
];

export default function WindowsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Active Windows</Text>
        <Text style={styles.headerSub}>{MOCK_WINDOWS.length}/{MAX_WINDOWS} running</Text>
      </View>
      <View style={styles.grid}>
        {Array.from({ length: MAX_WINDOWS }).map((_, i) => {
          const win = MOCK_WINDOWS[i];
          return (
            <View key={i} style={[styles.windowCard, !win && styles.emptyCard]}>
              {win ? (
                <>
                  <View style={[styles.statusDot, win.status === 'active' ? styles.dotGreen : styles.dotPulse]} />
                  <Text style={styles.windowAI}>{win.ai}</Text>
                  <Text style={styles.windowTask}>{win.task}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.emptyIcon}>+</Text>
                  <Text style={styles.emptyLabel}>Empty Slot</Text>
                </>
              )}
            </View>
          );
        })}
      </View>
      <TouchableOpacity style={styles.addBtn}>
        <Text style={styles.addBtnText}>+ Add Window</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },
  header: { padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  headerSub: { color: '#7b5ea7', fontSize: 14 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 8, gap: 10, justifyContent: 'center' },
  windowCard: {
    width: '45%',
    backgroundColor: '#13131f',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1e1e3a',
    minHeight: 100,
  },
  emptyCard: { borderStyle: 'dashed', borderColor: '#2a2a3a', alignItems: 'center', justifyContent: 'center' },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginBottom: 6 },
  dotGreen: { backgroundColor: '#2d6a4f' },
  dotPulse: { backgroundColor: '#7b5ea7' },
  windowAI: { color: '#fff', fontSize: 13, fontWeight: '700' },
  windowTask: { color: '#888', fontSize: 11, marginTop: 4, lineHeight: 16 },
  emptyIcon: { color: '#333', fontSize: 28, fontWeight: '300' },
  emptyLabel: { color: '#333', fontSize: 11, marginTop: 4 },
  addBtn: {
    backgroundColor: '#7b5ea7',
    margin: 16,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  addBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
