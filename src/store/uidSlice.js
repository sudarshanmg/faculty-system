import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: typeof window !== 'undefined' ? sessionStorage.getItem('uid') : '0',
};

export const uidSlice = createSlice({
  name: 'uid',
  initialState,
  reducers: {
    setUid: (state, action) => {
      state.value = action.payload;
      sessionStorage.setItem('uid', action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUid } = uidSlice.actions;

export default uidSlice.reducer;
