import React, { useState } from "react";
import { FormAction } from "./Form";
import Input from "./Input";
import axios from "axios";

const ResetPassword = ({ email }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordButtonPressed, setPasswordButtonPressed] = useState(false);
  const api = process.env.REACT_APP_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordButtonPressed(true);
    if (password !== confirmPassword) {
      console.log("password not matching");
      setPasswordButtonPressed(false);
      // TO-DO ADD PASSWORD NOT MATCHING ALERT
      return;
    }
    try {
      const response = await axios.patch(`${api}/auth/resetPassword`, {
        email: email,
        newPassword: password,
      });
      console.log(response.data);
    } catch (error) {
      setPasswordButtonPressed(false);
      console.log(error);
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
