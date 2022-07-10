import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Reset.css";
import ErrorMessage from "../errorMessage";
import queryString from "query-string";

export default function Reset() {
  const [password, setPassword] = useState("");
  const [confirmepassword, setConfirmepassword] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { token, id } = queryString.parse(location.search);

  const verifyToken = async () => {
    try {
      await axios.get(`/api/users/verify-token?token=${token}&id=${id}`);
    } catch (error) {
      if (error?.response?.data) {
        return console.log(error.response.data);
      }
      console.log(error);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmepassword) {
      setVariant("danger");
      setMessage("Password does not match !");
    } else {
      try {
        const { data } = await axios.post(
          `/api/users/reset-password?token=${token}&id=${id}`,
          { password }
        );
        if (data.success) {
          setVariant("success");
          setMessage(
            "Congratulation , You Will be redirected to the login page"
          );
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      } catch (error) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="text-center m-5-auto">
      <h2>Reset Password</h2>
      {message && <ErrorMessage variant={variant}>{message}</ErrorMessage>}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      <form onSubmit={submitHandler}>
        <p>
          <label>New Password</label>
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
          <label>Confirm Password</label>
          <br />
          <input
            type="password"
            name="confirmepassword"
            required
            value={confirmepassword}
            onChange={(e) => setConfirmepassword(e.target.value)}
          />
        </p>
        <p>
          <button id="sub_btn" type="submit">
            Reset Password
          </button>
        </p>
      </form>
    </div>
  );
}
