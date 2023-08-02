import React, { useState } from "react";

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
      <div className="my-5">Change password for {email}</div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

        <div className="my-10 relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  id="password"
                  type="password"
                  name="password"
                  className="outline-none peer w-full px-0.5 py-1 border-0 border-b-2 border-gray-300 placeholder-transparent focus:ring-0 focus:border-purple-600"
                  placeholder="Password"
                  disabled={passwordButtonPressed}
                />
                <label
                  for="password"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-600 peer-focus:text-sm"
                >
                  Password
                </label>
              </div>
              <div className="mb-10 relative">
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  required
                  id="confirm-password"
                  type="confirm-password"
                  name="confirm-password"
                  className="outline-none peer w-full px-0.5 py-1 border-0 border-b-2 border-gray-300 placeholder-transparent focus:ring-0 focus:border-purple-600"
                  placeholder="Password"
                  disabled={passwordButtonPressed}
                />
                <label
                  for="confirm-password"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-600 peer-focus:text-sm"
                >
                  Confirm Password
                </label>
              </div>
              <button
                      type="submit"
                      disabled= { passwordButtonPressed}
                      className="w-full py-2 text-lg text-white font-semibold text-center rounded-full bg-indigo-500 transition-all hover:bg-indigo-600 focus:outline-none"
                    >
                      Change Password
                    </button>
      </form>
    </div>
  );
};

export default ResetPassword;
