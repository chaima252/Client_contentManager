import React from "react";

import Sidebar from "../sidebar/Sidebar";
import "./home.css";
function Home() {
  return (
    <div className='home'>
      <div className='container'>
        <Sidebar />
        <div className='main'>
          <h1
            style={{ textAlign: "Left", fontSize: "40px", marginTop: "35px" }}
          >
            Dashboard
          </h1>
          <p>Welcome Content Manager👋</p>

          <div className='dash-title'>
            <h2>Last courses </h2>
          </div>
          <div className='last-courses-container'>
            <div className='card'>
              <div className='card-content'>
                <p className='heading'>Java</p>
              </div>
            </div>{" "}
            <div className='card'>
              <div className='card-content'>
                <p className='heading'>Python</p>
              </div>
            </div>{" "}
            <div className='card'>
              <div className='card-content'>
                <p className='heading'>C++</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
