import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";
import ErrorMessage from "../errorMessage";
import delay from "../delay";
import "./Register.css";

export default function Register() {
  const [values, setValues] = useState({
    login: "",
    email: "",
    password: "",
    confirmepassword: "",
  });
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const userParsed = JSON.parse(localStorage.getItem("userInfo"));
  const registerInfo = localStorage.getItem("registerInfo");
  const navigate = useNavigate();

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

  const handlechange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    if (userParsed?.isverified) {
      navigate("/home");
    }

    if (registerInfo) {
      redirect();
    }
  }, [loading]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (values.password !== values.confirmepassword) {
      setError("Password does not match !");
      await delay(3000);
      setError(null);
    } else {
      try {
        setLoading(true);
        const config = {
          headers: { "Content-type": "application/json" },
        };
        const { data } = await axios.post(
          "/api/users/register",
          {
            login: values.login,
            password: values.password,
            email: values.email,
          },
          config
        );
        localStorage.setItem("registerInfo", JSON.stringify(data));
        setLoading(false);
      } catch (error) {
        setError(error.response.data.error);
        setLoading(false);
        await delay(3000);
        setError(null);
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
            value={values.login}
            onChange={handlechange}
          />
        </p>
        <p>
          <label>Email address</label>
          <br />
          <input
            type="email"
            name="email"
            required
            value={values.email}
            onChange={handlechange}
          />
        </p>
        <p>
          <label>Password</label>
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
          <label>confirm Password</label>
          <br />
          <input
            type="password"
            name="confirmepassword"
            required
            value={values.confirmepassword}
            onChange={handlechange}
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
