import React from "react";
import Navbar from "../../components/Navbar/Navbar";

import "./NavbarPage.css";

export default function Homepage() {
  return (
    <div>
      <div class="wrapper">
        <div class="navbar">
          <Navbar />
        </div>
        <div class="board">board</div>
      </div>
    </div>
  );
}