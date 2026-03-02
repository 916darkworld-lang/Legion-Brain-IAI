import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  id: string;
  role: 'user' | 'iai';
  text: string;
  timestamp: number;
}

interface ChatState {
  messages: Message[];
  sessionId: string | null;
}

const initialState: ChatState = {
  messages: [],
  sessionId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
    clearChat(state) {
      state.messages = [];
      state.sessionId = null;
    },
    setSessionId(state, action: PayloadAction<string>) {
      state.sessionId = action.payload;
    },
  },
});

export const { addMessage, clearChat, setSessionId } = chatSlice.actions;
export default chatSlice.reducer;
