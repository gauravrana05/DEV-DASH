import { useState } from "react";
import { signupFields } from "../constants/formFields";
import { FormAction } from "./Form";
import Input from "./Input";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleGoogleLoginUtils } from "../utils/utils";
import { handleRegister } from "../utils/utils";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let fieldsState = {
  userName: "",
  email: "",
  password: "",
  "confirm-password": "",
};

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const target_id = e.target.id;
    const target_val = e.target.value;
    console.log((target_id, target_val));
    setSignupState({ ...signupState, [target_id]: target_val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signupState["password"] !== signupState["confirm-password"]) {
      toast.error("Passwords do not match", {
        autoClose: 1500,
      });
      return;
    }
    const body = {
      name: signupState["userName"],
      email: signupState["email"],
      password: signupState["password"],
    };
    const response = await handleRegister(body, dispatch, navigate);
    if (response.ok) {
      navigate("/OTP");
    }
    setSignupState(fieldsState);
  };

  const handleGoogleLogin = async (credentials) => {
    setSignupState(fieldsState);
    await handleGoogleLoginUtils(credentials, dispatch, navigate);
  };

  const handleError = (errorMsg) => {
    toast.error(errorMsg);
  };

  return (
    // <div>
    //       <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
    //         <div className="">
    //           {fields.map((field) => (
    //             <Input
    //               key={field.id}
    //               handleChange={handleChange}
    //               value={signupState[field.id]}
    //               labelText={field.labelText}
    //               labelFor={field.labelFor}
    //               id={field.id}
    //               name={field.name}
    //               type={field.type}
    //               isRequired={field.isRequired}
    //               placeholder={field.placeholder}
    //             />
    //           ))}
    //           <FormAction text="Signup" />
    //         </div>
    //       </form>
    //       <div className="flex justify-center items-center py-4">
    //         <GoogleLogin
    //           text="continue_with"
    //           width="100%"
    //           shape="pill"
    //           onSuccess={(credentialResponse) =>
    //             handleGoogleLogin(credentialResponse.credential)
    //           }
    //           onError={() => handleError("Login failed")}
    //         />
    //       </div>
    // </div>
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
              <Link to="/" className="block transition hover:rotate-180">
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
          <div className="px-10 pt-4 pb-6 rounded-3xl shadow-xl">
            <div className="mx-auto text-center">
              <Link
                to="/"
                className="flex items-center mb-2 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0"
              >
                <span className="mx-auto text-3xl font-black leading-none text-gray-900 select-none">
                  DevDash<span className="text-indigo-600">.</span>
                </span>
              </Link>
              <p className="mt-3">
                How do you want to <strong>SignUp</strong> ?
              </p>
            </div>
            <div className="flex items-center justify-around mt-4">
              <div className="w-14 h-14 text-center rounded-full bg-red-500 text-white saturate-100 transition-all hover:bg-red-600">
                <Link href="#" className="block mt-4">
                  <FontAwesomeIcon icon="fab fa-google fa-lg" />
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2 pt-4 pb-2">
              <span className="h-px bg-gray-400 w-14"></span>
              <span className="font-normal text-sm text-gray-500">
                or continue with
              </span>
              <span className="h-px bg-gray-400 w-14"></span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mt-3  relative">
                <input
                  onChange={handleChange}
                  value={signupState["userName"]}
                  id="userName"
                  name="userName"
                  type="text"
                  required
                  className=" outline-none peer w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-300 placeholder-transparent focus:ring-0 focus:border-purple-600"
                  placeholder="willPig@tailwind.com"
                />

                <label
                  for="userName"
                  className="  absolute left-0 -top-3.5 text-gray-600 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-600 peer-focus:text-sm"
                >
                  Username
                </label>
              </div>
              <div className="mt-6 relative">
                <input
                  onChange={handleChange}
                  value={signupState["email"]}
                  id="email"
                  name="email"
                  type="text"
                  required
                  className=" outline-none peer w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-300 placeholder-transparent focus:ring-0 focus:border-purple-600"
                  placeholder="willPig@tailwind.com"
                />
                <label
                  for="email"
                  className=" absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-600 peer-focus:text-sm"
                >
                  Email
                </label>
              </div>
              <div className="mt-6 relative">
                <input
                  onChange={handleChange}
                  value={signupState["password"]}
                  required
                  id="password"
                  type="password"
                  name="password"
                  className="outline-none peer w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-300 placeholder-transparent focus:ring-0 focus:border-purple-600"
                  placeholder="Password"
                />
                <label
                  for="password"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-600 peer-focus:text-sm"
                >
                  Password
                </label>
              </div>
              <div className="mt-6 relative">
                <input
                  onChange={handleChange}
                  value={signupState["confirm-password"]}
                  required
                  id="confirm-password"
                  type="confirm-password"
                  name="confirm-password"
                  className="outline-none peer w-full px-0.5 py-1.5 border-0 border-b-2 border-gray-300 placeholder-transparent focus:ring-0 focus:border-purple-600"
                  placeholder="Password"
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
                className="w-full mt-10 py-4 text-lg text-white font-semibold text-center rounded-full bg-indigo-500 transition-all hover:bg-indigo-600 focus:outline-none"
              >
                Sign Up
              </button>
              <p className="text-center text-sm text-gray-400 mt-4 mb-2 ">
                Have an account ?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-purple-600 hover:underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
