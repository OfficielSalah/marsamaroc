import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Forget from "./pages/Forget/Forget";
import Reset from "./pages/Reset/Reset";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile.jsx";
import Ajouter from "./pages/Ajouter/Ajouter";
import Historique from "./pages/Historique/Historique";
import Gestion from "./pages/Gestion/Gestion";
import Verify from "./pages/Verify/Verify";
import Lab from "./pages/Lab/Lab";
import None from "./pages/None/None";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Navigate to="/login" />} />
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
        <Route exact path="/test" element={<Lab />} />
        <Route path="*" element={<None />} />
      </Routes>
    </Router>
  );
}
