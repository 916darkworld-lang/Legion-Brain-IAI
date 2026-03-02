import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setAutoMode, setMaxWindows } from '../state/slices/settingsSlice';
import type { RootState } from '../state/store';

const AI_OPTIONS = [
  { id: 'claude', name: 'Claude 4 Opus', pro: true },
  { id: 'gemini', name: 'Gemini 2.5 Pro', pro: true },
  { id: 'grok', name: 'Grok-3', pro: true },
  { id: 'gpt4o', name: 'GPT-4o', pro: true },
  { id: 'mistral', name: 'Mistral Large', pro: true },
  { id: 'perplexity', name: 'Perplexity', pro: false },
];

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const { autoMode, maxWindows, isPro } = useSelector((state: RootState) => state.settings);
  const [selectedAIs, setSelectedAIs] = useState<string[]>(['perplexity']);

  const toggleAI = (id: string) => {
    setSelectedAIs(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : prev.length < maxWindows ? [...prev, id] : prev
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Subscription</Text>
        <View style={styles.planCard}>
          <Text style={styles.planName}>{isPro ? '⭐ Pro Plan' : 'Free Plan'}</Text>
          <Text style={styles.planDetail}>{isPro ? 'Unlimited generations · 8 windows' : '3 windows · Limited generations'}</Text>
          {!isPro && (
            <TouchableOpacity style={styles.upgradeBtn}>
              <Text style={styles.upgradeText}>Upgrade to Pro — $9/mo</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Window Options {!isPro && <Text style={styles.proTag}>(Pro)</Text>}</Text>
        <View style={styles.row}>
          <View>
            <Text style={styles.rowLabel}>Auto Mode</Text>
            <Text style={styles.rowSub}>IAI selects best AIs for your task</Text>
          </View>
          <Switch
            value={autoMode}
            onValueChange={v => dispatch(setAutoMode(v))}
            disabled={!isPro}
            trackColor={{ true: '#7b5ea7', false: '#333' }}
          />
        </View>
        <Text style={styles.subLabel}>Active Windows ({selectedAIs.length}/{maxWindows})</Text>
        {AI_OPTIONS.map(ai => (
          <TouchableOpacity
            key={ai.id}
            style={styles.aiRow}
            onPress={() => toggleAI(ai.id)}
            disabled={ai.pro && !isPro}>
            <Text style={[styles.aiName, ai.pro && !isPro && styles.disabled]}>{ai.name}</Text>
            {ai.pro && !isPro && <Text style={styles.proTag}>PRO</Text>}
            {(!ai.pro || isPro) && (
              <View style={[styles.checkbox, selectedAIs.includes(ai.id) && styles.checkboxActive]}>
                {selectedAIs.includes(ai.id) && <Text style={styles.checkmark}>✓</Text>}
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Theme</Text>
          <Text style={styles.rowValue}>Dark (Default)</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },
  section: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#1a1a2e' },
  sectionTitle: { color: '#aaa', fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 },
  planCard: { backgroundColor: '#13131f', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#1e1e3a' },
  planName: { color: '#fff', fontSize: 18, fontWeight: '800' },
  planDetail: { color: '#777', fontSize: 13, marginTop: 4 },
  upgradeBtn: { backgroundColor: '#7b5ea7', borderRadius: 10, padding: 12, alignItems: 'center', marginTop: 12 },
  upgradeText: { color: '#fff', fontWeight: '700' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  rowLabel: { color: '#fff', fontSize: 15 },
  rowSub: { color: '#666', fontSize: 12 },
  rowValue: { color: '#7b5ea7', fontSize: 14 },
  subLabel: { color: '#666', fontSize: 12, marginTop: 8, marginBottom: 8 },
  aiRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#111' },
  aiName: { color: '#fff', fontSize: 14 },
  disabled: { color: '#444' },
  proTag: { color: '#7b5ea7', fontSize: 11, fontWeight: '700' },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: '#333', alignItems: 'center', justifyContent: 'center' },
  checkboxActive: { backgroundColor: '#7b5ea7', borderColor: '#7b5ea7' },
  checkmark: { color: '#fff', fontSize: 13, fontWeight: '800' },
});
