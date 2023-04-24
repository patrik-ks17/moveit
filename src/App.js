import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MapPage from "./pages/MapPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import SportsPage from './pages/SportsPage';
import SupportPage from './pages/SupportPage';



function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const userType = window.localStorage.getItem("userType");
 
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route
            path="/login"
            element={
              (isLoggedIn === "false" || isLoggedIn === null) ? 
              <LoginPage /> 
              : 
              <HomePage />
            }
          />
          <Route
            path="/register"
            element={
              (isLoggedIn === "false" || isLoggedIn === null) ? 
              <RegisterPage /> 
              : 
              <HomePage />
            }
          />
          <Route path="/profile" 
            element={
              isLoggedIn !== "false" ? 
              <UserPage /> 
              :
              <HomePage />
            } 
          />
          <Route
            path="/admin"
            element={
              userType === "admin" ? (
                <AdminPage />
              ) : (
                <HomePage />
              )
            }
          />
          {/* <Route path="/chat" element={<ChatPage />} /> */}
          <Route path="/map" element={<MapPage />} />
          <Route path="/sport" element={<SportsPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
