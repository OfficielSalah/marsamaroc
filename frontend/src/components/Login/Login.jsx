import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import Loading from "../Loading";
import ErrorMessage from "../errorMessage";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/home");
    }
  }, [loading]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };
      setLoading(true);
      const { data } = await axios.post(
        "/api/users/login",
        { login, password },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="text-center m-5-auto">
      <h2>Se Connecter</h2>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <form onSubmit={submitHandler}>
        <p>
          <label>Identifiant</label>
          <br />
          <input
            type="text"
            name="login"
            required
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </p>
        <p>
          <label>Mot De Passe</label>
          <Link to="/forget-password">
            <label className="right-label">Mot de Passe Oublié?</label>
          </Link>
          <br />
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
        <p>
          <button id="sub_btn" type="submit">
            Se Connecter
          </button>
        </p>
      </form>
      <footer>
        <p>
          Premiére Fois? <Link to="/register">Crée un Compte</Link>.
        </p>
        <p>
          <Link to="/">Back to Homepage</Link>.
        </p>
      </footer>
    </div>
  );
}
