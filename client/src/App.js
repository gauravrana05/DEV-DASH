import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { GoogleOAuthProvider } from "@react-oauth/google";
import store from "./app/store";
import { Provider } from "react-redux";
import Emailverify from "./pages/Emailverify";

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
            </Routes>
          </GoogleOAuthProvider>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
