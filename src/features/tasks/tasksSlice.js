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
  extraReducers: {
    [getTasks.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getTasks.fulfilled]: (state, { payload }) => {
      state.tasks = state.tasks.concat(payload);
      state.status = 'success';
    },
    [getTasks.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export const selectTasks = (state) => state.tasks;

export default tasksSlice.reducer;
