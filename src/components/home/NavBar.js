import React from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Logout from "./../login/Logout";

function NavBar() {
  const navigate = useNavigate();
  const alert = useAlert();
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const userType = window.localStorage.getItem("userType");



  function handleClick(element) {
    const page = element.target.getAttribute("data-name");
    if ((page === "login" || page === "support") && isLoggedIn === null) {
      navigate("/" + page)
    }
    if (isLoggedIn !== "false" && userType === "admin") {
      navigate("/" + page)
    }
    if (isLoggedIn !== "false" && userType === "user") {
      if (page !== "admin") {
        navigate("/" + page)
      } else {
        alert.info("Nincs jogosultsága az oldalhoz!")
      }
    }
    if (page !== "support" && isLoggedIn === "false") {
      if (page === "login") {
        navigate("/" + page)
      } else {
        alert.info("Először jelentkezzen be!")
      }
    }
  }


  return (
    <div className="navbar">
      <ul>
        <li>
          {(isLoggedIn === null || isLoggedIn === "false") ?
            <img
              data-name={"login"}
              src="icon/navbar/login.png"
              alt="login"
              onClick={(e) => handleClick(e)}
            /> : userType === "admin" ?
              <img
                data-name={"admin"}
                src="icon/navbar/admin.png"
                alt="admin"
                onClick={(e) => handleClick(e)}
              /> :
              <img
                data-name={"profile"}
                src="icon/navbar/user.png"
                alt="profile"
                onClick={(e) => handleClick(e)}
              />
          }
        </li>
        <li>
          <img
            data-name={"chat"}
            src="icon/navbar/firechat.png"
            alt="chat"
            onClick={(e) => handleClick(e)}
          ></img>
        </li>
        <li>
          <img
            data-name={"sport"}
            src="icon/navbar/sports.png"
            alt="sport"
            onClick={(e) => handleClick(e)}
          ></img>
        </li>
        <li>
          <img
            data-name={"map"}
            src="icon/navbar/map.png"
            alt="map"
            onClick={(e) => handleClick(e)}
          ></img>
        </li>
        <li>
          <img
            data-name={"support"}
            src="icon/navbar/support.png"
            alt="support"
            onClick={(e) => handleClick(e)}
          ></img>
        </li>
        {(isLoggedIn !== null && isLoggedIn !== "false") &&
          <li>
            <img
              src="icon/navbar/logout.png"
              alt="logout"
              onClick={() => Logout(alert)}
            ></img>
          </li>
        }
      </ul>
    </div>
  );
}

export default NavBar
