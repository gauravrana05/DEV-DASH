import React, { useEffect, useRef, useState } from "react";
import { sendOTP, verifyOtpUtils } from "../utils/utils";
import { Link, useNavigate, useParams } from "react-router-dom";

const OTP = () => {
  const params = useParams();
  const email = atob(params.email);
  const type = params.type;
  const otpFieldsRef = useRef([]);
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [resendOtpDisable, setResendOtpDisable] = useState(true);
  const [verifyButton, setVerifyButton] = useState(false);
  const [timerCount, setTimerCount] = useState(60);
  const navigate = useNavigate();

  const resendOTP = async (e) => {
    if (resendOtpDisable) return;
    setVerifyButton(true);
    setResendOtpDisable(true);
    setTimerCount(60);
    setOtpValues(["", "", "", ""]);
    otpFieldsRef.current[0].focus();
    const response = await sendOTP(email);
    if (!response.ok) {
    }
  };

  const verfiyOTP = async (e) => {
    setVerifyButton(true);
    e.preventDefault();
    const otp = otpValues.join("");
    const response = await verifyOtpUtils(otp, email);
    console.log(response);
    if (!response.ok) {
      otpFieldsRef.current[0].focus();
      setOtpValues(["", "", "", ""]);
      setVerifyButton(false);
    } else {
      if (type === "register") {
        navigate("/login");
      } else {
        const encodedEmail = btoa(email);
        console.log("email = ", atob(encodedEmail));
        navigate(`/resetpassword/${encodedEmail}`);
      }
    }
  };

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
    <div className="relative min-h-screen bg-purple-100 backdrop-blur flex justify-center items-center bg-texture bg-cover py-28 sm:py-0">
      <div className="p-4 sm:p-8 flex-1 ">
        <div className="max-w-[420px] min-w-[320px] bg-white rounded-b-3xl mx-auto">
          <div className="relative h-auto mt-3">
            <svg
              className="absolute -top-20 "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
            >
              <path
                fill="#fff"
                fill-opacity="1"
                d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
            <div className="absolute bottom-5 right-2">
              <Link href="/" className="block transition hover:rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 stroke-current text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="px-10 pt-4 pb-8 rounded-3xl shadow-xl">
            <div className="mx-auto text-center">
              <Link
                to="/"
                className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0"
              >
                <span className="mx-auto text-3xl font-black leading-none text-gray-900 select-none">
                  DevDash<span className="text-indigo-600">.</span>
                </span>
              </Link>
            </div>
            <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {" "}
              Verify OTP
            </h1>
            <div>
              <form onSubmit={verfiyOTP}>
                <div className="flex flex-col space-y-16">
                  <div className=" mt-10 flex flex-row items-center justify-between mx-auto w-full max-w-xs">
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

                  <button
                    type="submit"
                    className="w-full py-2 text-lg text-white font-semibold text-center rounded-full bg-indigo-500 transition-all hover:bg-indigo-600 focus:outline-none"
                  >
                    Verify Account
                  </button>
                  <div className="flex flex-col space-y-2">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP;
