import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Verify.css";
import Loading from "../Loading";
import ErrorMessage from "../errorMessage";
import delay from "../delay";

export default function Verify() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState(null);
  const userParsed = JSON.parse(localStorage.getItem("userInfo"));
  const registerParsed = JSON.parse(localStorage.getItem("registerInfo"));
  const user_Id = registerParsed?._id;
  const navigate = useNavigate();

  const redirect = async () => {
    setVariant("success");
    setMessage("Congratulation ,votre address email est vérifier .");
    await delay(3000);
    setMessage("you will be redirected to the login page after a moment ...");
    await delay(2000);
    navigate("/login");
  };

  useEffect(() => {
    if (userParsed?.isverified) {
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
      await axios.post("/api/users/verify-email", { user_Id, otp }, config);
      localStorage.removeItem("registerInfo");
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
      await delay(3000);
      setError(null);
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