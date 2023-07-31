import { useState } from "react";
import { signupFields } from "../constants/formFields";
import { FormAction } from "./Form";
import Input from "./Input";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Spinner from "./Spinner";
import { handleGoogleLoginUtils } from "../utils/utils";
import { handeLoginRegister } from "../utils/utils";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signupState["password"] !== signupState["confirm-password"]) {
      console.log("password not matching");
      return;
    }
    setIsLoading(true);
    const body = {
      name: signupState["fullName"],
      email: signupState["email"],
      password: signupState["password"],
    };
    const data = await handeLoginRegister(body, "register", dispatch, navigate);
    console.log(data);
    setIsLoading(false);
    setSignupState(fieldsState);
  };

  const handleGoogleLogin = async (credentials) => {
    setSignupState(fieldsState);
    setIsLoading(true);
    await handleGoogleLoginUtils(credentials, dispatch, navigate);
    setIsLoading(false);
  };

  const handleError = (errorMsg) => {
    console.log("From signup", errorMsg);
    //TO-DO: Add alert with data.msg
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
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
              <FormAction text="Signup" />
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
              onError={() => handleError("Login failed")}
            />
          </div>
        </>
      )}
    </div>
  );
}
