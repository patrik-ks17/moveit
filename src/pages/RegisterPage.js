import React, { useState, useContext } from "react";
import Validate from "../components/login/Validate";
import "../assets/style/login/Login.css";
import Nav from "../components/Nav";
import { HookContext } from "../context/Context";


function RegisterPage() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    passagain: "",
  };
  const {alert, navigate} = useContext(HookContext);
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

  const Submit = async () => {
    const response = await fetch(`${process.env.REACT_APP_IP}/register`, {
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
    if (!response.ok) {
      alert.error("Sikertelen regisztráció!");
      return;
    }
    const json = await response.json();
    if (json.status === "ok") {
      alert.success("Sikeres regisztráció!");
      setTimeout(() => navigate("/login"), 2000);
    } else if (json.error === "User already exists") {
      alert.error("Regisztrált email cím!");
    } else {
      alert.error(json.error)    
    }
}

return (
  <div className="back-reg-page">
    <div>
      <Nav />
      <div className="reg-page w-10/12 lg:w-3/12">
        <form data-testid="reg-form" className="register-form p-5 md:p-0 md:pl-10 md:pr-10" onSubmit={handleSubmit}>
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

          <span data-testid="navigate" className="link-btn" onClick={() => navigate("/login")}>
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