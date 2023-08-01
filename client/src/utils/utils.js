import axios from "axios";
import {
  createApp,
  deleteApp,
  login,
  setApps,
  updateApp,
} from "../features/userSlice";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const handleGoogleLoginUtils = async (
  credentials,
  dispatch,
  navigate
) => {
  try {
    console.log(credentials);
    const { data } = await api.post("/auth/googleLogin", { credentials });
    console.log(data);
    dispatch(login(data));
    navigate("/");
  } catch (error) {
    console.log(error);
    return {};
    // handleError(data.msg);
  }
};

export const handeLoginRegister = async (
  body,
  type,
  dispatch,
  navigate,
  remember = false
) => {
  try {
    const { data } = await toast.promise( api.post(`/auth/${type}`, { ...body }), {
        pending: "Logging In",
        success: "Login Successful",
        error: "Unsuccessful Login Attempt"
      })
    // const { data } = await api.post(`/auth/${type}`, { ...body });
    if (type === "register") {
      navigate("/login");
    } else if (type === "login") {
      dispatch(login(data));
      if (remember) {
        localStorage.setItem("token", data.token);
      }
      navigate("/");
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAppsUtil = async (token, dispatch) => {
  try {
    const { data } = await api.get("/apps", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    dispatch(setApps({ apps: data.apps }));
  } catch (error) {
    console.log("from dashboard", error);
  }
};

export const deleteAppUtil = async (appId, token, dispatch) => {
  try {
    await api.delete(`/apps/${appId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    dispatch(deleteApp(appId));
  } catch (error) {
    // handleError(data.msg);
  }
};

export const createUpdateAppUtil = async (
  type,
  body,
  token,
  appId = "",
  dispatch,
  navigate
) => {
  try {
    if (type === "create") {
      const { data } = await api.post("/apps", body, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch(createApp(data));
    } else {
      const { data } = await api.patch(`/apps/${appId}`, body, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      dispatch(updateApp(data.app));
    }
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
