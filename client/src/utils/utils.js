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
    navigate("/dashboard");
  }
   catch (error) {
    console.log(error);
    // handleError(data.msg);
    return { ok: false };
  }
};

export const handleRegister = async (body, dispatch, navigate) => {
  try {
    const { data } = await toast.promise(
      api.post("/auth/register", { ...body }),
      {
        pending: "Sending OTP",
        success: "OTP sent to mail Successfully",
        error: "Unsuccessful sign up Attempt",
      }
    );
    console.log(data);
    return { ok: true, ...data };
  } catch (error) {
    console.log(error);
    return { ok: false };
  }
};

export const handleLogin = async (body, dispatch, navigate, remember) => {
  try {
    const { data } = await toast.promise(api.post("/auth/login", { ...body }), {
      pending: "Logging In",
      success: "Login Successful",
      error: "Unsuccessful Login Attempt",
    });
    // const { data } = await api.post(`/auth/${type}`, { ...body });
    dispatch(login(data));
    if (remember) {
      localStorage.setItem("token", data.token);
    }
    navigate("/dashboard");
    return data;
  } catch (error) {
    console.log(error);
    return { ok: false };
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
    return { ok: false };
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
    return { ok: false };
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
    navigate("/dashboard");
  } catch (error) {
    console.log(error);
    return { ok: false };
  }
};

export const verifyOtpUtils = async (otp, email) => {
  try {
    console.log(otp);
    const response = await api.post("/auth/verifyotp", {
      email: email,
      OTP: otp,
    });
    console.log(response.data);
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};

export const sendOTP = async (email) => {
  try {
    await api.post("/auth/reset", {
      email: email,
    });
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};

export const resetpasswordUtils = async (email, password) => {
  try {
    const response = await api.patch("/auth/resetPassword", {
      email: email,
      newPassword: password,
    });
    console.log(response.data);
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};
