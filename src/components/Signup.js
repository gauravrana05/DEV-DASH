import { useState } from "react";
import { signupFields } from "../constants/formFields";
import { FormAction } from "./Form";
import Input from "./Input";
import { GoogleLogin } from "@react-oauth/google";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupState),
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data);
    } else {
      handleError(data.msg);
      console.log(data);
    }
    setSignupState(fieldsState);
  };

  const handleGoogleLogin = async (credentials) => {
    setSignupState(fieldsState);
    const response = await fetch("http://localhost:5000/auth/googleLogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credentials }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data);
    } else {
      handleError(data.msg);
      console.log(data);
    }
  };

  const handleError = (errorMsg) => {
    //TO-DO: Add alert with data.msg
  };

  return (
    <div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
          {fields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={signupState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>
      </form>
      <div className="flex justify-center items-center py-4">
        <GoogleLogin
          text="continue_with"
          width="100%"
          shape="pill"
          onSuccess={(credentialResponse) =>
            handleGoogleLogin(credentialResponse.credential)
          }
          onError={handleError("Login failed")}
        />
      </div>
    </div>
  );
}
