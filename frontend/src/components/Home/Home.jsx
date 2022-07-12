import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      navigate("/login");
    }
    setUser(JSON.parse(localStorage.getItem("userInfo")));
  }, []);
  return (
    <div className="homee">
      <Sidebar login={user.login} />
      <div className="bien">
        <h1>Bienvenue Dans Votre Compte Personnel</h1>
        <div className="rule">
          <h2 className="last">Veuillez D'abord mettre a jour Votre Profil</h2>
          <h2 className="last">Pour Pouvoir vous inscrire dans un service</h2>
        </div>
      </div>
    </div>
  );
}
