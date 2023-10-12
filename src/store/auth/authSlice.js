import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const initialValue = () => {
  try {
    jwtDecode(localStorage.getItem("token"));

    return true;
  } catch (err) {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");

    return false;
  }
};

const initialState = {
  value: initialValue(),
};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { set } = authSlice.actions;

export default authSlice.reducer;
