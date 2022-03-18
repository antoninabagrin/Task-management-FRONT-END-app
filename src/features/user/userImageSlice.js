import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export const getUserImage = createAsyncThunk(
  'userImage/getUserImage',

  async (body, thnukAPI) => {
    const res = await axios.get('/users/user/profile-image', {
      responseType: 'blob',
    });

    const imageObj = await res.data;
    thnukAPI.dispatch(setUserImage(URL.createObjectURL(imageObj)));
    return URL.createObjectURL(imageObj);
  },
);

export const updateUserImage = createAsyncThunk(
  'userImage/updateUserImage',

  async (profileImage, thnukAPI) => {
    const formData = new FormData();
    formData.append('file', profileImage);
    await axios.post('/users/upload/profile-image', formData, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
    thnukAPI.dispatch(getUserImage());
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
        state.profileImage = action.payload;
        state.status = 'succes';
      })
      .addCase(getUserImage.rejected, (state, _action) => {
        state.status = 'failed';
      });
  },
});
export const { setUserImage } = userImageSlice.actions;
export const selectUserImage = (state) => state.userImage.profileImage;

export default userImageSlice.reducer;
