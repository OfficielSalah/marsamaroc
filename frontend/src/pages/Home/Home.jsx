import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "../../layout/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo");
  if (!userInfo) {
    navigate("/login");
  }
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userInfo")));
  }, []);
  return (
    <div className="homee">
      <Sidebar login={user.login} />
      <div className="bien">
        <h1>Bienvenue Dans Votre Compte Personnel</h1>
        <div className="rule">
          <h2 className="last">Veuillez D'abord mettre a jour Votre Profil</h2>
          <h2 className="last">En Inscrivant Dans Un Service</h2>
          <h2 className="last">Pour Pouvoir Créer Une Demande</h2>
        </div>
      </div>
    </div>
  );
}
