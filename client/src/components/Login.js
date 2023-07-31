import { useState } from "react";
import { loginFields } from "../constants/formFields";
import { FormAction, FormExtra } from "./Form";
import Input from "./Input";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handeLoginRegister, handleGoogleLoginUtils } from "../utils/utils";

export default function Login() {
  const fields = loginFields;
  let fieldsState = {};
  fields.forEach((field) => (fieldsState[field.id] = ""));

  const [loginState, setLoginState] = useState(fieldsState);
  const [remember, setRemember] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handeLoginRegister(loginState, "login", dispatch, navigate, remember);
    setLoginState(fieldsState);
  };

  const handleGoogleLogin = async (credentials) => {
    setLoginState(fieldsState);
    await handleGoogleLoginUtils(credentials, dispatch, navigate);
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
        <FormAction text="Login" />
      </form>

      <div className="flex justify-center items-center py-4">
        <GoogleLogin
          text="continue_with"
          width="100%"
          shape="pill"
          onSuccess={(credentialResponse) =>
            handleGoogleLogin(credentialResponse.credential)
          }
          onError={() => handleError("Login failed")}
        />
      </div>
    </div>
  );
}
