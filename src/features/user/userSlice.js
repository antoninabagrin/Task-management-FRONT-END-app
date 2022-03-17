import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuth: false,
    user: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      role: '',

      isDeactivated: '',
    },
  },
  reducers: {
    handleLogin: (state, action) => {
      state.isAuth = true;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    handleLogout: (state) => {
      state.isAuth = false;
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
});

export const { handleLogin, handleLogout, setIsAuth, setUser } =
  userSlice.actions;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
