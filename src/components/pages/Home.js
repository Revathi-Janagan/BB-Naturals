import React from "react";
import Header from "../../containers/Header";
import FrontBoard from "../../containers/FrontBoard";
import "./Home.css";

const Home = () => {
  return (
    <div className="container">
      <div className="bg-image" ></div>
      <Header />
      <div className="front-board-container">
        <div className="front-board-content">
          <FrontBoard />
        </div>
      </div>
    </div>
  );
};

export default Home;
