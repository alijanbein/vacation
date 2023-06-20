import { Routes, BrowserRouter, Route, useNavigate, json } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { useEffect, useState } from "react";
import AuthContext from "./context/authContext";
import HomePage from "./pages/HomePage";
import MyVacations from "./pages/MyVacations";
import Heading from "./navigator/Heading";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [userId,setUserId] = useState('')
  const navigat = useNavigate()
  const login = (token,id) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId",id)
    setUserId(id)
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
    let userId = localStorage.getItem("userId");
    if(token){
      login(token,userId)
    }
    else {
      navigat("/auth")
    }
  }, []);
  return (

      <AuthContext.Provider value={{ isLoggedIn,userId, token, login, logout }} >
      <Heading/>
      <Routes>
          <Route path="/auth" element={<AuthPage />} />
          {isLoggedIn && <Route path='/' element={<HomePage/>} />}
          {isLoggedIn && <Route path='/my_vacation' element={<MyVacations/>} />
}

      </Routes>
      </AuthContext.Provider>
  );
}

export default App;
