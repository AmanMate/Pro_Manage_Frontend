import React from "react";
import "./Navbar.css";
import Vector from "../../assets/icons/Vector.png";
import layout from "../../assets/icons/layout.png";
import database from "../../assets/icons/database.png";
import settings from "../../assets/icons/settings.png";
import Logout from "../../assets/icons/Logout.png";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  
  const navigate = useNavigate();

  return (
    <div>
      <div className="nav-wrapper">
        <div className="logo-name">
          <img src={Vector} 
            alt="Logo"  
          />
          <h1>Pro Manage</h1>
        </div>
        
        <div>
          <nav>
            <a
              className="submenu"
              onClick={() => navigate("/board")}
              >
              <img src={layout} alt="Board Page"/>
              <h1>Board</h1>
            </a>
            <a 
              className="submenu"
              onClick={() => navigate("/analytics")}
              >
              <img src={database} alt="Analytics Page"/>
              <h1>Analytics</h1>
            </a>
            <a 
              className="submenu"
              onClick={() => navigate("/settings")}
              >
              <img src={settings} alt="Settings Page" />
              <h1>Settings</h1>
            </a>
          </nav>
        </div>

        <a className="logout submenu">
          <img src={Logout} alt="Logout" />
          <h1>Logout</h1>
        </a>
      </div>
    </div>
  );
}


