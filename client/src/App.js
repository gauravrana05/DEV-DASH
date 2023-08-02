import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import OTP from "./pages/OTP";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import { GoogleOAuthProvider } from "@react-oauth/google";
import store from "./app/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import the library
import { library } from "@fortawesome/fontawesome-svg-core";

// import your icons
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

function App() {
  const GoogleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <GoogleOAuthProvider clientId={GoogleClientId}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/resetpassword/:email" element={<ResetPassword />} />
              <Route path="/otp/:email/:type" element={<OTP />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </GoogleOAuthProvider>
        </BrowserRouter>
      </Provider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
library.add(fab, fas, far);
