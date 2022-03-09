import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export const getUserDetails = createAsyncThunk(
  'userDetails/getUserDetails',

  async () => {
    const res = await axios.get('/user-details/getUserDetails');
    return res.data;
  },
);

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    data: {},
    status: 'idle',
  },
  extraReducers(builder) {
    builder
      .addCase(getUserDetails.pending, (state, _action) => {
        state.status = 'loading';
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'success';
      })
      .addCase(getUserDetails.rejected, (state, _action) => {
        state.status = 'failed';
      });
  },
});

export const selectUserDetails = (state) => state.userDetails;

export default userDetailsSlice.reducer;
