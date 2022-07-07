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
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState(null);
  let navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("registerInfo"));
  const userId = user?._id;

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/home");
    }
  }, [navigate]);

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
      setLoading(false);
      setVariant("success");
      setMessage("Congratulation ,votre address email est vérifier");
      setInterval(() => {
        setMessage(
          "you will be redirected to the login page after a moment ..."
        );
      }, 2000);
      setInterval(() => {
        localStorage.removeItem("registerInfo");
        navigate("/");
      }, 3000);
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
