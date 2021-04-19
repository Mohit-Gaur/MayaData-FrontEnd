import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import menu from "../assets/menu.svg";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <li className="hamburger">
            <Link to="#" className="menu-bar">
              <img src={menu} alt="" onClick={showSidebar}></img>   
            </Link>
            <span className="roll">{sidebar ? "1806489" : ""}</span>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className="nav-text">
                <Link to={item.path}>
                  {item.icon}
                  <span>{sidebar ? item.title : ""}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
