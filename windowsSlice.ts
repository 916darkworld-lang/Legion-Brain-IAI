import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WindowSlot {
  id: number;
  ai: string | null;
  status: 'idle' | 'active' | 'thinking' | 'done';
  task?: string;
  output?: string;
}

interface WindowsState {
  slots: WindowSlot[];
}

const initialState: WindowsState = {
  slots: Array.from({ length: 8 }, (_, i) => ({ id: i + 1, ai: null, status: 'idle' })),
};

const windowsSlice = createSlice({
  name: 'windows',
  initialState,
  reducers: {
    assignAI(state, action: PayloadAction<{ slotId: number; ai: string }>) {
      const slot = state.slots.find(s => s.id === action.payload.slotId);
      if (slot) slot.ai = action.payload.ai;
    },
    updateSlotStatus(state, action: PayloadAction<{ slotId: number; status: WindowSlot['status']; task?: string }>) {
      const slot = state.slots.find(s => s.id === action.payload.slotId);
      if (slot) {
        slot.status = action.payload.status;
        if (action.payload.task) slot.task = action.payload.task;
      }
    },
    clearSlot(state, action: PayloadAction<number>) {
      const slot = state.slots.find(s => s.id === action.payload);
      if (slot) { slot.ai = null; slot.status = 'idle'; slot.task = undefined; slot.output = undefined; }
    },
  },
});

export const { assignAI, updateSlotStatus, clearSlot } = windowsSlice.actions;
export default windowsSlice.reducer;
