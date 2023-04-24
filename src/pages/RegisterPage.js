import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Validate from "../components/login/Validate";
import "../assets/style/login/Login.css";
import Nav from "../components/Nav";

function RegisterPage() {
  const alert = useAlert();
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    passagain: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(Validate(formValues));
    if (Object.keys(Validate(formValues)).length === 0) {
      Submit();
    }
  };

  function Submit() {
    fetch(`${process.env.REACT_APP_IP}/register`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          alert.success("Sikeres regisztráció!");
          setTimeout(() => navigate("/login"), 2000);
        } else if (data.error === "User already exists") {
          alert.error("Regisztrált email cím!");
        } else {
          alert.error("Sikertelen regisztráció!");
        }
      });
  }

  return (
    <div className="back-reg-page">
      <div>
        <Nav />
        <div className="reg-page w-10/12 lg:w-3/12">
          <form className="register-form p-5 md:p-0 md:pl-10 md:pr-10" onSubmit={handleSubmit}>
            <h1>Regisztráció</h1>
            <label htmlFor="username">Felhasználónév</label>
            <input
              value={formValues.username}
              onChange={handleChange}
              type="text"
              placeholder="Felhasznalo"
              id="username"
              name="username"
            ></input>
            <p>{formErrors.username}</p>
            <label htmlFor="email">Email</label>
            <input
              value={formValues.email}
              onChange={handleChange}
              type="email"
              placeholder="emailcimed@gmail.com"
              id="email"
              name="email"
            ></input>
            <p>{formErrors.email}</p>
            <label htmlFor="password">Jelszó</label>
            <input
              value={formValues.password}
              onChange={handleChange}
              type="password"
              placeholder="*********"
              id="password"
              name="password"
            ></input>
            <p>{formErrors.password}</p>
            <label htmlFor="passagain">Jelszó újra</label>
            <input
              value={formValues.passagain}
              onChange={handleChange}
              type="password"
              placeholder="*********"
              id="passagain"
              name="passagain"
            ></input>
            <p>{formErrors.passagain}</p>

            <span className="link-btn" onClick={() => navigate("/login")}>
              Van már fiókom.
            </span>
            <input className="reg-btn" type="submit" value={"Regisztráció"} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;