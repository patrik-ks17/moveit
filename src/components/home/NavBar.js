import React, {useContext} from "react";
import Logout from "./../login/Logout";
import { HookContext } from "../../context/Context";


function NavBar() {
  const {alert, navigate} = useContext(HookContext);
  
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const userType = window.localStorage.getItem("userType");

  function handleClick(element) {
    const page = element.target.getAttribute("data-name")
    if (!["support", "login"].includes(page) && isLoggedIn === "false") {
      alert.info("Először jelentkezzen be!")
    }
    else if (page === "admin" && (isLoggedIn === "false" || userType === "user")) {
      alert.info("Nincs jogosultsága az oldalhoz!")
    }
    else {
      navigate("/" + page)
    }
  }

  return (
    <div className="navbar">
      <ul>
        <li>
          {isLoggedIn === "false" ?
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
        {isLoggedIn !== "false" &&
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
