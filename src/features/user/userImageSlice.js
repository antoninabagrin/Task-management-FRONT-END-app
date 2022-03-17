import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import userSlice from './userSlice';

export const getUserImage = createAsyncThunk(
  'userImage/getUserImage',

  async () => {
    const res = await axios.get('/users/user/profile-image', {
      responseType: 'blob',
    });
    return setUserImage({
      preview: URL.createObjectURL(res.data),
      raw: res.data,
    });
  },
);

export const updateUserImage = createAsyncThunk(
  'userImage/updateUserImage',

  async (profileImage) => {
    const formData = new FormData();
    formData.append('file', profileImage.raw);
    await axios.post('/users/upload/profile-image', formData, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
  },
);
const userImageSlice = createSlice({
  name: 'userImage',
  initialState: {
    user: {},
    profileImage: '',
    status: 'idle',
  },
  reducers: {
    setUserImage: (state, action) => {
      state.profileImage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserImage.pending, (state, _action) => {
        state.status = 'loading';
      })
      .addCase(getUserImage.fulfilled, (state, action) => {
        state.profileImage = action.payload.profileImage;
        state.status = 'succes';
      })
      .addCase(getUserImage.rejected, (state, _action) => {
        state.status = 'failed';
      });
  },
});
export const setUserImage = userSlice.action;
export const selectUserImage = (state) => state.userImage.profileImage;

export default userImageSlice.reducer;
