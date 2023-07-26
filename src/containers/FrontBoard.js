import React from "react";
import "./FrontBoard.css";

const FrontBoard = () => {
  return (
    <div className="front-board">
     
        <div className="mask">
          <div className=" d-flex align-items-center justify-content-start text-left h-100">
            <div className="text-italic">
              <h3 className="mb-3 " style={{color:"red"}}>123, Central Square, New York</h3>
              <h1 className="mb-3" style={{color:"white"}}>BB Naturals</h1>
              <p className="mb-4" style={{color:"white"}}>
                A short description that goes well with the title and the
                purpose of the page. Make it
               look attractive so that users are encouraged to click on
                the call-to-action.
              </p>
              <button
                className="btn btn-outline-light btn-lg m-2 custom-btn-front"
                rel="nofollow"
                target="_blank"
              >
                GET GORGEOUS
              </button>
              <button
                className="btn btn-outline-dark btn-lg m-2 custom-btn-contact"
                target="_blank"
              >
                CONTACT NOW
              </button>
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default FrontBoard;
