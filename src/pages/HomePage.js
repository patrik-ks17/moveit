import "../assets/style/home/Home.css";
import "../assets/style/home/Navbar.css"
import {React} from "react";
import NavBar from "../components/home/NavBar";
import Welcome from "../components/home/Welcome";


function HomePage() {
  return (
    <div className="back-home-page">
      <div>
        <div className="home-page">
          <h1>Move iT</h1>
          <div className="center">
              <NavBar />
            </div>
          <Welcome />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
