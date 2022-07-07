import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="full">
      <h1 className="main-title text-center">Bienvenue sur votre compte</h1>
      <p className="main-para text-center">Gestion Du Centre De Vacances</p>
      <div className="buttons text-center">
        <Link to="/login">
          <button className="primary-button">Se Connecter</button>
        </Link>
        <Link to="/register">
          <button className="primary-button" id="reg_btn">
            <span>S'inscrire</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
