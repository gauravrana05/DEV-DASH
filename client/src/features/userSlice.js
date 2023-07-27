import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || "",
  name: "",
  id: localStorage.getItem("id") || "",
  apps: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    logout: (state) => {
      state.token = "";
      state.id = "";
    },
    setApps: (state, { payload }) => {
      state.apps = payload.apps;
    },
  },
});

export const { login, logout, setApps } = userSlice.actions;

export default userSlice.reducer;
