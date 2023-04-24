import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MapPage from "./pages/MapPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import SportsPage from './pages/SportsPage';
import SupportPage from './pages/SupportPage';
import PageError from './pages/PageError';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("loggedIn"))
  const [userType, setUserType] = useState(localStorage.getItem("userType"))

  useEffect(() => {
    if (isLoggedIn === null) {
      localStorage.setItem("loggedIn", "false")
      setIsLoggedIn(localStorage.getItem("loggedIn"))
    }
    if (userType === null) {
      localStorage.setItem("userType", "guest")
      setUserType(localStorage.getItem("userType"))
    }
  }, [isLoggedIn, userType])


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route
            path="/login"
            element={
              isLoggedIn === "false" ?
                <LoginPage setIsLoggedIn={setIsLoggedIn} setUserType={setUserType} />
                :
                <HomePage />
            }
          />
          <Route
            path="/register"
            element={
              isLoggedIn === "false" ?
                <RegisterPage />
                :
                <HomePage />
            }
          />
          <Route path="/profile"
            element={
              (isLoggedIn !== "false" && userType === "user") ?
                <UserPage />
                :
                <HomePage />
            }
          />
          <Route
            path="/admin"
            element={
              (isLoggedIn !== "false" && userType === "admin") ?
                <AdminPage />
                :
                <HomePage />
            }
          />
          {/* <Route path="/chat" element={<ChatPage />} /> */}
          <Route
            path="/map"
            element={
              (isLoggedIn !== "false" && userType !== "guest") ? 
                <MapPage /> 
                : 
                <HomePage />
            } 
          />
          <Route 
            path="/sport" 
            element={
              (isLoggedIn !== "false" && userType !== "guest") ? 
                <SportsPage />
                : 
                <HomePage />
            } 
          />
          <Route 
            path="/support" 
            element={<SupportPage/>} 
          />
          <Route path="*" element={<PageError/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
