import React, { useContext, useState } from "react";
import "../assets/style/login/Login.css";
import Nav from "../components/Nav";
import { HookContext } from "../context/Context";

function LoginPage({ setIsLoggedIn, setUserType }) {
  const {alert, navigate} = useContext(HookContext);
  const [formValues, setFormValues] = useState({ user: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_IP}/login`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        usern: formValues.user,
        password: formValues.password,
      }),
    })
    if (!response.ok) {
      alert.error("Sikertelen bejelentkezés");
      return;
    }
    const json = await response.json();
    if (json.status === "ok") {
      window.localStorage.setItem("token", json.data.token);
      window.localStorage.setItem("loggedIn", json.data.email);
      window.localStorage.setItem("userType", json.data.usertype);
      setIsLoggedIn(localStorage.getItem("loggedIn"));
      setUserType(localStorage.getItem("userType"));
      alert.success("Sikeres bejelentkezés!");
      setTimeout(() => navigate("/home"), 2000);
    } else if (json.error === "User not found") {
      alert.error("Nem regisztrált felhasználó!");
    } else if (json.error === "Invalid password") {
      alert.error("Hibás jelszó!")
    } else {
      alert.error(json.error)
    }
  };

  return (
    <div className="back-login-page">
      <div>
        <Nav />
        <div className="login-page w-10/12 lg:w-3/12">
          <form data-testid="login-form" className="login-form p-5 md:p-0 md:pl-10 md:pr-10" onSubmit={handleSubmit}>
            <h1>Belépés</h1>
            <label htmlFor="user">Felhasználónév/Email</label>
            <input
              value={formValues.user}
              onChange={handleChange}
              type="text"
              placeholder="Felhasznalo / Email"
              id="user"
              name="user"
            ></input>
            <label htmlFor="password">Jelszó</label>
            <input
              value={formValues.password}
              onChange={handleChange}
              type="password"
              placeholder="*********"
              id="password"
              name="password"
            ></input>

            <span data-testid="navigate" className="link-btn" onClick={() => navigate("/register")}>
              Nincs még fiókom.
            </span>
            <input className="login-btn" type="submit" value={"Belépés"} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
