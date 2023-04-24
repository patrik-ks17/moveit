import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import "../assets/style/login/Login.css";
import Nav from "../components/Nav";

function LoginPage() {
  const alert = useAlert();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ user: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_IP}/login`, {
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
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          window.localStorage.setItem("token", data.data.token);
          window.localStorage.setItem("loggedIn", data.data.email);
          window.localStorage.setItem("userType", data.data.usertype);
          alert.success("Sikeres bejelentkezés!");
          setTimeout(() => navigate("/home"), 2000);
        } else {
          alert.error("Sikertelen bejelentkezés!");
        }
      });
  };

  return (
    <div className="back-login-page">
      <div>
        <Nav />
        <div className="login-page w-10/12 lg:w-3/12">
          <form className="login-form p-5 md:p-0 md:pl-10 md:pr-10" onSubmit={handleSubmit}>
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

            <span href="" className="link-btn" onClick={() => navigate("/register")}>
              Nincs még fiókom.
            </span>
            <input className="login-btn" type="submit" value={"Belépés"}/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
