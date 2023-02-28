import { configureStore } from '@reduxjs/toolkit';
import uidReducer from '../store/uidSlice';

export const store = configureStore({
  reducer: {
    uid: uidReducer,
  },
});
