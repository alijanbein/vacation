import { Routes, BrowserRouter, Route, useNavigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { useEffect, useState } from "react";
import AuthContext from "./context/authContext";
import HomePage from "./pages/HomePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const navigat = useNavigate()
  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigat("/auth")
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      login(token)
    }
    else {
      navigat("/auth")
    }
  }, []);
  return (
      <AuthContext.Provider value={{ isLoggedIn, token, login, logout }} >
      <Routes>
          <Route path="/auth" element={<AuthPage />} />
          {isLoggedIn && <Route path='/' element={<HomePage/>} />
}

      </Routes>
      </AuthContext.Provider>
  );
}

export default App;
