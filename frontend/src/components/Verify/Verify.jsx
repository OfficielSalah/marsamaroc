import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Verify.css";
import Loading from "../Loading";
import ErrorMessage from "../errorMessage";

export default function Verify() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState(null);
  const pass = JSON.parse(localStorage.getItem("userInfo"));
  const user = JSON.parse(localStorage.getItem("registerInfo"));
  const userId = user?._id;
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
    setMessage("Congratulation ,votre address email est vérifier .");
    await delay(3000);
    setMessage("you will be redirected to the login page after a moment ...");
    await delay(2000);
    navigate("/login");
  };

  useEffect(() => {
    if (pass?.isverified) {
      navigate("/home");
    }
    if (success) {
      redirect();
    }
  }, [success]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const config = {
        headers: { "Content-type": "application/json" },
      };
      const { data } = await axios.post(
        "/api/users/verify-email",
        { userId, otp },
        config
      );
      localStorage.removeItem("registerInfo");
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="text-center m-5-auto">
      <h2>vérifier Votre Email</h2>
      {message && <ErrorMessage variant={variant}>{message}</ErrorMessage>}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <form onSubmit={submitHandler}>
        <p>
          <label>code OTP</label>
          <br />
          <input
            type="text"
            name="otp"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </p>
        <p>
          <button id="sub_btn" type="submit">
            Vérifier
          </button>
        </p>
      </form>
    </div>
  );
}
