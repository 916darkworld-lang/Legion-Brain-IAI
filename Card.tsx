import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CardProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  onPress?: () => void;
  children?: React.ReactNode;
}

export default function Card({ title, subtitle, badge, badgeColor = '#7b5ea7', onPress, children }: CardProps) {
  const Wrapper = onPress ? TouchableOpacity : View;
  return (
    <Wrapper style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.cardHeader}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        {badge && <View style={[styles.badge, { backgroundColor: badgeColor }]}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>}
      </View>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {children}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#13131f',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1e1e3a',
    marginBottom: 10,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: '#fff', fontSize: 15, fontWeight: '700', flex: 1 },
  subtitle: { color: '#777', fontSize: 13, marginTop: 4 },
  badge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, marginLeft: 8 },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
});
