import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export const getTasks = createAsyncThunk(
  'tasks/getTasks',

  async () => {
    const res = await axios.get('/tasks');
    return res.data;
  },
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: 'idle',
  },
  extraReducers(builder) {
    builder
      .addCase(getTasks.pending, (state, _action) => {
        state.status = 'loading';
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.status = 'success';
      })
      .addCase(getTasks.rejected, (state, _action) => {
        state.status = 'failed';
      });
  },
});

export const selectTasks = (state) => state.tasks;

export default tasksSlice.reducer;
