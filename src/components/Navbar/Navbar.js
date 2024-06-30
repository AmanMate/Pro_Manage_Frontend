import React, { useState, useEffect } from "react";
import "./Navbar.css";
import Vector from "../../assets/icons/Vector.png";
import layout from "../../assets/icons/layout.png";
import database from "../../assets/icons/database.png";
import settings from "../../assets/icons/settings.png";
import Logout from "../../assets/icons/Logout.png";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setActive(location.pathname.substring(1));
  }, [location.pathname]);

  const handleNavigation = (path, name) => {
    setActive(name);
    navigate(path);
  };

  const handleLogoutClick = () => {
    setShowPopup(true);
  };

  const handleCancelClick = () => {
    setShowPopup(false);
  };

  const handleConfirmLogout = () => {
    setShowPopup(false);
    navigate("/login");
  };

  return (
    <div className="nav-wrapper">
      <div className={`logo-name ${active ? "active" : ""}`}>
        <img src={Vector} alt="Logo" />
        <h1>Pro Manage</h1>
      </div>
      
      <nav className="active-button">
        <a
          className={`submenu ${active === "board" ? "active" : ""}`}
          onClick={() => handleNavigation("/board", "board")}
        >
          <img src={layout} alt="Board Page" />
          <p>Board</p>
        </a>
        <a
          className={`submenu ${active === "analytics" ? "active" : ""}`}
          onClick={() => handleNavigation("/analytics", "analytics")}
        >
          <img src={database} alt="Analytics Page" />
          <p>Analytics</p>
        </a>
        <a
          className={`submenu ${active === "settings" ? "active" : ""}`}
          onClick={() => handleNavigation("/settings", "settings")}
        >
          <img src={settings} alt="Settings Page" />
          <p>Settings</p>
        </a>
      </nav>

      <a className="logout submenu" onClick={handleLogoutClick}>
        <img src={Logout} alt="Logout" />
        <p className="logout-text">Logout</p>
      </a>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Are you sure you want to Logout?</p>
            <button className="popup-confirm-button" onClick={handleConfirmLogout}>
              Yes, Logout
            </button>
            <button className="popup-cancel-button" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
