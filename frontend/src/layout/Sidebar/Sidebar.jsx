import React from "react";
import logo from "../../assets/images/marsa-sidebar.png";
import { sidebarData } from "./sidebarData";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Sidebar.css";

export default function Sidebar() {
  const userParsed = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <header>
        <div className="image-text">
          <span className="logo">
            <img src={logo} alt="logo" />
          </span>
        </div>
      </header>
      <div className="login">{userParsed.login}</div>
      <ul className="sidelist">
        {sidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className="siderow"
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </li>
          );
        })}
        <li
          className="siderow"
          onClick={() => {
            localStorage.removeItem("userInfo");
            navigate("/");
          }}
        >
          <div id="icon">
            <LogoutIcon />
          </div>
          <div id="title">Déconnexion</div>
        </li>
      </ul>
    </div>
  );
}
