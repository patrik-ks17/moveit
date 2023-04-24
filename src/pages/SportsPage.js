import "../assets/style/sports/Sports.css";
import React from "react";
import Body from "../components/sports/Body";
import Nav from "../components/Nav";


function SportsPage() {
  return (
    <div className="back-sports-page">
      <div>
        <Nav />
        <div className="sports-page">
          <h1>Sportok</h1>
          <Body/>
        </div>
      </div>
    </div>
  );
}

export default SportsPage;
