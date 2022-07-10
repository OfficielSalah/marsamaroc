import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
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
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/ajouter"
          element={
            <PrivateRoute>
              <Ajouter />
            </PrivateRoute>
          }
        />
        <Route
          path="/historique"
          element={
            <PrivateRoute>
              <Historique />
            </PrivateRoute>
          }
        />
        <Route
          path="/gestion"
          element={
            <PrivateRoute>
              <Gestion />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </Router>
  );
}
