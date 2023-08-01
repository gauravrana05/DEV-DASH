import React, { useState } from "react";
import { FormAction } from "./Form";
import Input from "./Input";
import { resetpasswordUtils } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const ResetPassword = ({ email }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordButtonPressed, setPasswordButtonPressed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordButtonPressed(true);
    if (password !== confirmPassword) {
      console.log("password not matching");
      setPasswordButtonPressed(false);
      // TO-DO ADD PASSWORD NOT MATCHING ALERT
      return;
    }
    const response = await resetpasswordUtils(email, password);
    if (!response.ok) {
      setPasswordButtonPressed(false);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <div>Change password for {email}</div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
          <Input
            handleChange={(e) => setPassword(e.target.value)}
            value={password}
            labelText={"password"}
            labelFor={"password"}
            id={"password"}
            name={"password"}
            type={"password"}
            isRequired={true}
            placeholder={"password"}
            disabled={passwordButtonPressed}
          />
          <Input
            handleChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            labelText={"confirm Password"}
            labelFor={"confirm Password"}
            id={"confirm Password"}
            name={"confirm Password"}
            type={"password"}
            isRequired={true}
            placeholder={"confirm Password"}
            disabled={passwordButtonPressed}
          />
        </div>
        <FormAction text="Change password" disabled={passwordButtonPressed} />
      </form>
    </div>
  );
};

export default ResetPassword;
