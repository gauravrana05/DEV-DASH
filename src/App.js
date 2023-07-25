import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div>
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/home" element= {<HomePage/>} />
            <Route path="/dashboard" element= {<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;