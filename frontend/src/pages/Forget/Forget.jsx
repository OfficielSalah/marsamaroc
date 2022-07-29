import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading";
import ErrorMessage from "../errorMessage";
import { useNavigate } from "react-router-dom";
import delay from "../delay";
import "./Forget.css";

export default function Forget() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState(null);
  const userParsed = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();

  useEffect(() => {
    if (userParsed?.isverified) {
      navigate("/home");
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const config = {
        headers: { "Content-type": "application/json" },
      };
      await axios.post("/api/users/forget-password", { email }, config);
      setLoading(false);
      setVariant("success");
      setMessage("Password reset link is sent to your email");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
      await delay(3000);
      setError(null);
    }
  };
  return (
    <div className="text-center m-5-auto">
      <h2>Reset your password</h2>
      <h5>Enter your email address and we will send you a new password</h5>
      {message && <ErrorMessage variant={variant}>{message}</ErrorMessage>}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <form onSubmit={submitHandler}>
        <p>
          <label id="reset_pass_lbl">Email address</label>
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
          <button id="sub_btn" type="submit">
            send reset email
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