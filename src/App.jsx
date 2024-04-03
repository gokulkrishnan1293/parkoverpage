import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <>
      <div className="screen">
        <div className="screen-overlay"></div>

        <div className="screen-content">
          <div className="screen-user">
            <span className="name" data-value="GOKUL">
              GOKUL
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
