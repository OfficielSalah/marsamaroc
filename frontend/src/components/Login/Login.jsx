import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import Loading from "../Loading";
import ErrorMessage from "../errorMessage";
import delay from "../delay";

export default function Login() {
  const [values, setValues] = useState({
    login: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const userParsed = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();

  const handlechange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    if (userParsed?.isverified) {
      navigate("/home");
    }
    if (data) {
      localStorage.setItem("userInfo", JSON.stringify(data));
      let user = JSON.parse(JSON.stringify(data));
      if (user.isverified) {
        navigate("/home");
      } else {
        localStorage.removeItem("userInfo");
        setError("Your Account is not yet Verified");
      }
    }
  }, [loading]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const config = {
        headers: { "Content-type": "application/json" },
      };
      const { data } = await axios.post(
        "/api/users/login",
        { login: values.login, password: values.password },
        config
      );
      setData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
      await delay(3000);
      setError(null);
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
            value={values.login}
            onChange={handlechange}
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
            value={values.password}
            onChange={handlechange}
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
