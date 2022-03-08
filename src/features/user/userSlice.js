import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { isAuth: false },
  reducers: {
    handleLogin: (state) => {
      state.isAuth = true;
    },
    handleLogout: (state) => {
      state.isAuth = false;
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
});

export const { handleLogin, handleLogout, setIsAuth } = userSlice.actions;

export default userSlice.reducer;
