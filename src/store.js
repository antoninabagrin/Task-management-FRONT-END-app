import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import tasksReducer from './features/tasks/tasksSlice';
import userDetailsReducer from './features/user/userDetailsSlice';
import userImageReducer from './features/user/userImageSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
    userDetails: userDetailsReducer,
    userImage: userImageReducer,
  },
});

export default store;
