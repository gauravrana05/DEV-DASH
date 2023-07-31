import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import { forgotPasswordFields } from "../constants/formFields";
import axios from "axios";
import { FormAction } from "../components/Form";
import ResetPassword from "../components/ResetPassword";

const ForgotPassword = () => {
  const api = process.env.REACT_APP_BASE_URL;
  const [email, setEmail] = useState("");
  const [otpButton, setOtpButton] = useState(false);
  const [verifyButton, setVerifyButton] = useState(false);
  const [timerCount, setTimerCount] = useState(60);
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [resendOtpDisable, setResendOtpDisable] = useState(true);
  const [otpVerified, setOtpVerified] = useState(false);

  const otpFieldsRef = useRef([]);

  const handleOTPChange = (e, index) => {
    const input = e.target.value;
    if (input.length > 1 || input < "0" || input > "9") {
      return;
    }
    const newOTPValues = [...otpValues];
    newOTPValues[index] = input;
    setOtpValues(newOTPValues);
    if (input.length === 1 && index < otpValues.length - 1) {
      otpFieldsRef.current[index + 1].focus();
    }
  };

  const handleBackspace = (index) => {
    if (otpValues[index] !== "") {
      const newotpValues = [...otpValues];
      newotpValues[index] = "";
      setOtpValues(newotpValues);
    } else if (index > 0) {
      otpFieldsRef.current[index - 1].focus();
    }
  };

  const sendOTP = async () => {
    try {
      await axios.post(`${api}/auth/reset`, {
        email: email,
      });
    } catch (error) {
      handleError(error);
      setOtpButton(false);
      setEmail("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTimerCount(60);
    console.log("setting timer count to ", timerCount);
    setOtpButton(true);
    await sendOTP();
  };

  const handleError = (error) => {
    console.log(error);
  };

  const resendOTP = async (e) => {
    if (resendOtpDisable) return;
    setResendOtpDisable(true);
    setTimerCount(60);
    setOtpValues(["", "", "", ""]);
    otpFieldsRef.current[0].focus();
    await sendOTP();
  };

  const verfiyOTP = async (e) => {
    setVerifyButton(true);
    e.preventDefault();
    setTimeout(async () => {
      try {
        const otp = otpValues.join("");
        console.log(otp);
        const response = await axios.post(`${api}/auth/verifyotp`, {
          email: email,
          OTP: otp,
        });
        console.log(response.data);
        setOtpVerified(true);
      } catch (error) {
        setVerifyButton(false);
        handleError(error);
      }
    }, 2000);
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setTimerCount((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setResendOtpDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [resendOtpDisable]);

  return (
    <div>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md space-y-8 p-9 w-96 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
          <Header
            heading={otpVerified ? "Reset Password" : "Forgot password"}
          />
          {!otpButton && (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>Please enter your email to reset your password.</div>
              <Input
                handleChange={(e) => setEmail(e.target.value)}
                labelText={forgotPasswordFields.labelText}
                labelFor={forgotPasswordFields.labelFor}
                value={email}
                id={forgotPasswordFields.id}
                name={forgotPasswordFields.name}
                type={forgotPasswordFields.type}
                isRequired={forgotPasswordFields.isRequired}
                placeholder={forgotPasswordFields.placeholder}
                disabled={otpButton}
              />
              <FormAction text="Send OTP" disabled={otpButton} />
            </form>
          )}
          {otpButton && !otpVerified && (
            <div>
              <form onSubmit={verfiyOTP}>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    {otpValues.map((value, index) => {
                      return (
                        <div key={index} className="w-16 h-16 ">
                          <input
                            maxLength="1"
                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 disabled:cursor-not-allowed"
                            type="text"
                            required={true}
                            value={value}
                            autoFocus={index === 0}
                            disabled={verifyButton}
                            onChange={(e) => handleOTPChange(e, index)}
                            onKeyDown={(e) => {
                              if (e.key === "Backspace") {
                                handleBackspace(index);
                              }
                            }}
                            ref={(ref) => {
                              otpFieldsRef.current[index] = ref;
                            }}
                          ></input>
                        </div>
                      );
                    })}
                  </div>

                  <FormAction text={"Verify Account"} />
                  <div className="flex flex-col space-y-5">
                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't recieve code?</p>{" "}
                      <button
                        className="flex flex-row items-center enabled:text-blue-700 enabled:underline disabled:text-gray disabled:cursor-dafult"
                        type="button"
                        disabled={resendOtpDisable}
                        onClick={() => resendOTP()}
                      >
                        {resendOtpDisable
                          ? `Resend OTP in ${timerCount}s`
                          : "Resend OTP"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
          {otpVerified && <ResetPassword email={email} />}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
