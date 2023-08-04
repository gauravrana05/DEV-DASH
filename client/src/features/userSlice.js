import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || "",
  name: "",
  apps: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.token = "";
    },
    setApps: (state, { payload }) => {
      state.apps = payload.apps;
    },
    createApp: (state, { payload }) => {
      state.apps.push(payload.app);
    },
    deleteApp: (state, { payload }) => {
      const appId = payload;
      state.apps = state.apps.filter(({ _id }) => appId !== _id);
    },
    updateApp: (state, { payload }) => {
      const { _id } = payload;
      state.apps = state.apps.map((app) => {
        if (app._id === _id) return payload;
        return app;
      });
    },
  },
});

export const { login, logout, setApps, createApp, deleteApp, updateApp } =
  userSlice.actions;

export default userSlice.reducer;
