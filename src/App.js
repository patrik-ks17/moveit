import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { HookContext } from "./context/Context";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import PageNotFound from './pages/PageNotFound';
const AdminPage = React.lazy(() => import("./pages/AdminPage"))
const SportsPage = React.lazy(() => import("./pages/SportsPage"))
const MapPage = React.lazy(() => import("./pages/MapPage"))
const SupportPage = React.lazy(() => import("./pages/SupportPage"))
const ChatPage = React.lazy(() => import("./pages/ChatPage"))



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("loggedIn"))
  const [userType, setUserType] = useState(localStorage.getItem("userType"))
  const navigate = useNavigate();
  const alert = useAlert()


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
      <HookContext.Provider value={{ alert, navigate }}>
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
                <React.Suspense fallback={<p>Betöltés...</p>}>
                  <UserPage />
                </React.Suspense>
                :
                <HomePage />
            }
          />
          <Route
            path="/admin"
            element={
              (isLoggedIn !== "false" && userType === "admin") ?
                <React.Suspense fallback={<p>Betöltés...</p>}>
                  <AdminPage />
                </React.Suspense>
                :
                <HomePage />
            }
          />
          <Route path="/chat" element={
            (isLoggedIn !== "false" && userType === "admin") ?
              <React.Suspense fallback={<p>Betöltés...</p>}>
                <ChatPage />
              </React.Suspense>
              :
              <HomePage />
          } />
          <Route
            path="/map"
            element={
              (isLoggedIn !== "false" && userType !== "guest") ?
                <React.Suspense fallback={<p>Betöltés...</p>}>
                  <MapPage />
                </React.Suspense>
                :
                <HomePage />
            }
          />
          <Route
            path="/sport"
            element={
              (isLoggedIn !== "false" && userType !== "guest") ?
                <React.Suspense fallback={<p>Betöltés...</p>}>
                  <SportsPage />
                </React.Suspense>
                :
                <HomePage />
            }
          />
          <Route
            path="/support"
            element={
              <React.Suspense fallback={<p>Betöltés...</p>}>
                <SupportPage />
              </React.Suspense>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </HookContext.Provider>
    </div>
  );
}

export default App;
