import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  start: {row:14,col:4},
  finish: {row:14,col:45},
};

const pathSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setStart(state, action) {
      state.start = action.payload;
    },
    setFinish(state, action) {
      state.finish = action.payload;
    }
  },
});

const store = configureStore({ reducer: pathSlice.reducer });
export const pathActions = pathSlice.actions;

export default store;