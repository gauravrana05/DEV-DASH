import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import { GoogleOAuthProvider } from "@react-oauth/google";
import store from "./app/store";
import { Provider } from "react-redux";
import Emailverify from "./pages/Emailverify";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const GoogleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <GoogleOAuthProvider clientId={GoogleClientId}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/auth/:id/verify/:token" element={<Emailverify />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </GoogleOAuthProvider>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
