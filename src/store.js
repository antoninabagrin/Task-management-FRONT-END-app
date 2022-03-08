import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import tasksReducer from './features/tasks/tasksSlice';
import userDetailsReducer from './features/user/userDetailsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
    userDetails: userDetailsReducer,
  },
});

export default store;
