import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";
import ErrorMessage from "../errorMessage";
import "./Register.css";

export default function Register() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmepassword, setConfirmepassword] = useState("");

  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function delay(s) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, s);
    });
  }

  const redirect = async () => {
    setVariant("success");
    setMessage(
      "Congratulation ,a confirmation code had been sent to your address email"
    );
    await delay(2000);
    setMessage(
      "you will be redirected to the email verification page after a moment ..."
    );
    await delay(3000);
    navigate("/verify-email");
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/home");
    }
    const registerInfo = localStorage.getItem("registerInfo");
    if (registerInfo) {
      redirect();
    }
  }, [loading]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmepassword) {
      setVariant("danger");
      setMessage("Password does not match !");
    } else {
      try {
        setLoading(true);
        const config = {
          headers: { "Content-type": "application/json" },
        };
        const { data } = await axios.post(
          "/api/users/register",
          { login, password, email },
          config
        );
        localStorage.setItem("registerInfo", JSON.stringify(data));
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className="text-center m-5-auto">
      <h2>Joignez Nous</h2>
      <h5>Crée Votre Compte Personnel</h5>
      {message && <ErrorMessage variant={variant}>{message}</ErrorMessage>}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <form onSubmit={submitHandler}>
        <p>
          <label>Login</label>
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
          <label>Email address</label>
          <br />
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>
        <p>
          <label>Password</label>
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
          <label>confirm Password</label>
          <br />
          <input
            type="password"
            name="password"
            required
            value={confirmepassword}
            onChange={(e) => setConfirmepassword(e.target.value)}
          />
        </p>
        <p>
          <button id="sub_btn" type="submit">
            Crée Compte
          </button>
        </p>
      </form>
      <footer>
        <p>
          <Link to="/">Back to Homepage</Link>.
        </p>
      </footer>
    </div>
  );
}
