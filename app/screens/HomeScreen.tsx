import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.logo}>Legion AI°</Text>
        <Text style={styles.tagline}>The Vibe-Coding Platform</Text>
        <Text style={styles.sub}>
          Chat naturally. Build complete apps & games. Publish to the Legion Store.
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNum}>8</Text>
          <Text style={styles.statLabel}>Max Windows</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNum}>∞</Text>
          <Text style={styles.statLabel}>Generations</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNum}>70%</Text>
          <Text style={styles.statLabel}>Creator Cut</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.ctaBtn} onPress={() => navigation.navigate('Chat')}>
        <Text style={styles.ctaText}>Start Vibe-Coding →</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What You Can Build</Text>
        {['Full Video Games', 'Production Apps', 'Movies & Ads', 'Store-Ready Projects'].map(item => (
          <View key={item} style={styles.featureRow}>
            <Text style={styles.featureDot}>◆</Text>
            <Text style={styles.featureText}>{item}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },
  hero: { alignItems: 'center', padding: 32, paddingTop: 48 },
  logo: { fontSize: 42, fontWeight: '900', color: '#7b5ea7', letterSpacing: 2 },
  tagline: { fontSize: 16, color: '#aaa', marginTop: 4 },
  sub: { fontSize: 14, color: '#777', textAlign: 'center', marginTop: 12, lineHeight: 20 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', padding: 16 },
  statCard: {
    backgroundColor: '#13131f',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: 100,
    borderWidth: 1,
    borderColor: '#1e1e3a',
  },
  statNum: { fontSize: 28, fontWeight: '800', color: '#7b5ea7' },
  statLabel: { fontSize: 11, color: '#888', marginTop: 4 },
  ctaBtn: {
    backgroundColor: '#7b5ea7',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  section: { padding: 16 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 12 },
  featureRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  featureDot: { color: '#7b5ea7', marginRight: 10, fontSize: 10 },
  featureText: { color: '#ccc', fontSize: 14 },
});
