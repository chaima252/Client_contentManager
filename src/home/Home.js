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
          <p>Welcome 👋</p>

          <div className='last-courses-container'>
            <p>Last courses </p>
            <div class="card">
              <div class="card-content">
                <p class="heading">Java</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
