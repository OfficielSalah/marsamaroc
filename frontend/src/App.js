import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Forget from "./components/Forget/Forget";
import Reset from "./components/Reset/Reset";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile.jsx";
import Ajouter from "./components/Ajouter/Ajouter";
import Historique from "./components/Historique/Historique";
import Gestion from "./components/Gestion/Gestion";
import Verify from "./components/Verify/Verify";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<Verify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<Forget />} />
        <Route path="/reset-password" element={<Reset />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ajouter" element={<Ajouter />} />
        <Route path="/historique" element={<Historique />} />
        <Route path="/gestion" element={<Gestion />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </Router>
  );
}
