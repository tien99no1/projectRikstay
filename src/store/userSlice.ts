import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      lastName: "",
      pending: false,
      error: false,
    },
  },
  reducers: {
    signUpStart: (state) => {
      state.user.pending = true;
    },
    signUpError: (state) => {
      state.user.pending = false;
      state.user.error = true;
    },
    signUpSuccess: (state, action) => {
      state.user.pending = false;
      state.user.error = false;
      state.user.lastName = action.payload.lastName;
    },
    logoutRequest: (state, action) => {
      state.user.lastName = "";
    },
  },
});
export const { signUpStart, signUpError, signUpSuccess, logoutRequest } =
  userSlice.actions;
export default userSlice.reducer;
