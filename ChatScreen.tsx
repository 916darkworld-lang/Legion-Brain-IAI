import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../state/slices/chatSlice';
import { sendMessage } from '../services/api';
import type { RootState } from '../state/store';

export default function ChatScreen() {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chat.messages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now().toString(), role: 'user', text: input, timestamp: Date.now() };
    dispatch(addMessage(userMsg));
    setInput('');
    setLoading(true);
    try {
      const reply = await sendMessage(input, messages);
      dispatch(addMessage({ id: Date.now().toString(), role: 'iai', text: reply, timestamp: Date.now() }));
    } catch (e) {
      dispatch(addMessage({ id: Date.now().toString(), role: 'iai', text: 'IAI offline. Check connection.', timestamp: Date.now() }));
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={[styles.bubble, item.role === 'user' ? styles.userBubble : styles.iaiBubble]}>
      {item.role === 'iai' && <Text style={styles.iaiLabel}>IAI°</Text>}
      <Text style={styles.bubbleText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}>
      <FlatList
        ref={listRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        onContentSizeChange={() => listRef.current?.scrollToEnd()}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Legion AI°</Text>
            <Text style={styles.emptySubtext}>
              Tell me what to build.{'\n'}Example: "Build a 3D racing game with synthwave vibes"
            </Text>
          </View>
        }
      />
      {loading && (
        <View style={styles.thinkingBar}>
          <ActivityIndicator color="#7b5ea7" size="small" />
          <Text style={styles.thinkingText}>IAI is thinking...</Text>
        </View>
      )}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Tell IAI what to build..."
          placeholderTextColor="#555"
          multiline
          returnKeyType="send"
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend} disabled={loading}>
          <Text style={styles.sendText}>▶</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },
  list: { padding: 16, paddingBottom: 8 },
  bubble: { maxWidth: '80%', borderRadius: 16, padding: 12, marginBottom: 10 },
  userBubble: { backgroundColor: '#7b5ea7', alignSelf: 'flex-end' },
  iaiBubble: {
    backgroundColor: '#13131f',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#1e1e3a',
  },
  iaiLabel: { color: '#7b5ea7', fontSize: 11, fontWeight: '700', marginBottom: 4 },
  bubbleText: { color: '#fff', fontSize: 14, lineHeight: 20 },
  thinkingBar: { flexDirection: 'row', alignItems: 'center', padding: 12, gap: 8 },
  thinkingText: { color: '#7b5ea7', fontSize: 13 },
  inputRow: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#1a1a2e',
    alignItems: 'flex-end',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#13131f',
    color: '#fff',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#1e1e3a',
  },
  sendBtn: {
    backgroundColor: '#7b5ea7',
    borderRadius: 12,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendText: { color: '#fff', fontSize: 18 },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 100 },
  emptyText: { color: '#7b5ea7', fontSize: 28, fontWeight: '900' },
  emptySubtext: { color: '#555', fontSize: 14, textAlign: 'center', marginTop: 12, lineHeight: 22 },
});
