import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Verify.css";
import Loading from "../Loading";
import ErrorMessage from "../errorMessage";

export default function Verify() {
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      setVariant("success");
      setMessage("Congratulation ,votre address email est vérifier");
      setInterval(() => {
        setMessage(
          "you will be redirected to the login page after a moment ..."
        );
      }, 2000);
      setInterval(() => {
        navigate("/login");
      }, 4000);
    }
    const registerInfoCheck = localStorage.getItem("registerInfo");
    if (!registerInfoCheck) {
      navigate("/");
    }
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
      // const registerInfo = JSON.parse(localStorage.getItem("registerInfo"));
      //setUserId(registerInfo._id);

      const { data } = await axios.post(
        "/api/users/login",
        { userId, otp },
        config
      );
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
