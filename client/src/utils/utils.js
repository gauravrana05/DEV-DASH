import axios from "axios";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const handleGoogleLoginUtils = async (credentials) => {
  try {
    const { data } = await toast.promise(
      api.post("/auth/googleLogin", { credentials }),
      {
        pending: "Logging in",
        success: "Login Successful",
        error: {
          render({ data: error }) {
            return error.response.data.msg;
          },
        },
      }
    );
    return { ok: true, data };
  } catch (error) {
    console.log(error);
    return { ok: false };
  }
};

export const handleRegisterUtils = async (body) => {
  try {
    const { data } = await toast.promise(
      api.post("/auth/register", { ...body }),
      {
        pending: "Sending OTP",
        success: "OTP sent to mail Successfully",
        error: {
          render({ data: error }) {
            return error.response.data.msg;
          },
        },
      }
    );
    console.log(data);
    return { ok: true, ...data };
  } catch (error) {
    console.log(error);
    return { ok: false };
  }
};

export const handleLogin = async (body) => {
  try {
    const { data } = await toast.promise(api.post("/auth/login", { ...body }), {
      pending: "Logging In",
      success: "Login Successful",
      error: {
        render({ data: error }) {
          return error.response.data.msg;
        },
      },
    });
    return { ok: true, data };
  } catch (error) {
    console.log(error);
    return { ok: false, msg: error.response.data.msg };
  }
};

export const getAppsUtil = async (token) => {
  try {
    const { data } = await toast.promise(
      api.get("/apps", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      {
        pending: "Gettin apps",
        // success: "",
        error: {
          render({ data: error }) {
            return error.response.data.msg;
          },
        },
      }
    );
    return { ok: true, data };
  } catch (error) {
    console.log("from dashboard", error);
    return { ok: false };
  }
};

export const deleteAppUtil = async (appId, token) => {
  try {
    await toast.promise(
      api.delete(`/apps/${appId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      {
        pending: "deleting app",
        success: "App deleted sucessfully",
        error: {
          render({ data: error }) {
            return error.response.data.msg;
          },
        },
      }
    );
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};

export const createUpdateAppUtil = async (type, body, token, appId = "") => {
  try {
    if (type === "create") {
      const { data } = await toast.promise(
        api.post("/apps", body, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }),
        {
          pending: "Creating app",
          success: "App created sucessfully",
          error: {
            render({ data: error }) {
              return error.response.data.msg;
            },
          },
        }
      );
      return { ok: true, data };
    } else {
      const { data } = await toast.promise(
        api.patch(`/apps/${appId}`, body, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }),
        {
          pending: "Updating app",
          success: "App updated sucessfully",
          error: {
            render({ data: error }) {
              return error.response.data.msg;
            },
          },
        }
      );
      console.log(data);
      return { ok: true, data };
    }
    // navigate("/dashboard");
  } catch (error) {
    console.log(error);
    return { ok: false };
  }
};

export const verifyOtpUtils = async (otp, email, type) => {
  try {
    const response = await toast.promise(
      api.post("/auth/verifyotp", {
        email: email,
        OTP: otp,
        type: type,
      }),
      {
        pending: "Verfying OTP",
        success: "OTP verified sucessfully",
        error: {
          render({ data: error }) {
            return error.response.data.msg;
          },
        },
      }
    );
    console.log(response);
    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, msg: error.response.data.msg };
  }
};

export const sendOTP = async (email, type) => {
  try {
    console.log(email);
    await toast.promise(
      api.post("/auth/reset", {
        email: email,
        type: type,
      }),
      {
        pending: "Sending OTP",
        success: "OTP sent to mail sucessfully",
        error: {
          render({ data: error }) {
            return error.response.data.msg;
          },
        },
      }
    );
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};

export const resetpasswordUtils = async (email, password) => {
  try {
    const response = await toast.promise(
      api.patch("/auth/resetPassword", {
        email: email,
        newPassword: password,
      }),
      {
        pending: "Resetting password",
        success: "Password reset sucessfully",
        error: {
          render({ data: error }) {
            return error.response.data.msg;
          },
        },
      }
    );
    console.log(response.data);
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};
