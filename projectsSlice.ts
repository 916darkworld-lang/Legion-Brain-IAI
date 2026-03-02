import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Project {
  id: string;
  name: string;
  type: 'Game' | 'App' | 'Movie';
  accuracy: number;
  updatedAt: number;
  status: 'draft' | 'published';
}

interface ProjectsState {
  list: Project[];
}

const initialState: ProjectsState = { list: [] };

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject(state, action: PayloadAction<Project>) {
      state.list.unshift(action.payload);
    },
    updateProject(state, action: PayloadAction<Partial<Project> & { id: string }>) {
      const idx = state.list.findIndex(p => p.id === action.payload.id);
      if (idx !== -1) Object.assign(state.list[idx], action.payload);
    },
    setAccuracy(state, action: PayloadAction<{ id: string; accuracy: number }>) {
      const project = state.list.find(p => p.id === action.payload.id);
      if (project) project.accuracy = action.payload.accuracy;
    },
  },
});

export const { addProject, updateProject, setAccuracy } = projectsSlice.actions;
export default projectsSlice.reducer;
