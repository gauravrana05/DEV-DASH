import { useState } from "react";
import { loginFields } from "../constants/formFields";
import { FormAction, FormExtra } from "./Form";
import Input from "./Input";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

const fields = loginFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);
  const [remember, setRemember] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const api = process.env.REACT_APP_BASE_URL;

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(api);
    const response = await fetch(`${api}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginState),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(login(data));
      if (remember) {
        localStorage.setItem("id", data.id);
        localStorage.setItem("token", data.token);
      }
      navigate("/");
    } else {
      handleError(data.msg);
    }
    setLoginState(fieldsState);
  };

  const handleGoogleLogin = async (credentials) => {
    setLoginState(fieldsState);

    const response = await fetch(`${api}/auth/googleLogin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credentials }),
    });

    const data = await response.json();
    if (response.ok) {
      dispatch(login(data));
      navigate("/");
    } else {
      handleError(data.msg);
    }
  };

  const handleError = (errorMsg) => {
    console.log("From Login", errorMsg);
    //TO-DO: Add alert with data.msg
  };

  return (
    <div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
          {fields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={loginState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
        </div>
        <FormExtra setRemember={setRemember} />
        <FormAction handleSubmit={handleSubmit} text="Login" />
      </form>

      <div className="flex justify-center items-center py-4">
        <GoogleLogin
          text="continue_with"
          width="100%"
          shape="l"
          pil
          onSuccess={(credentialResponse) =>
            handleGoogleLogin(credentialResponse.credential)
          }
          onError={() => handleError("Login failed")}
        />
      </div>
    </div>
  );
}
