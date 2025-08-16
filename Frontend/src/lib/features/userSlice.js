// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: { name: "sharada" },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action);
      state.user = action.payload;
    },
  },
});

// Named export for actions
export const { setUser } = userSlice.actions;

// Default export for the reducer
export default userSlice.reducer;
