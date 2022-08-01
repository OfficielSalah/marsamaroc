import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Marsa from "../../assets/images/marsa-email.png";
import Notification from "../../components/Notification";
import styles from "./Login.module.css";
import Carousel from "../../layout/Carousel/Carousel";

import {
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@mui/material";
import { VisibilityOff, Visibility, AccountCircle } from "@mui/icons-material";

export default function Landing() {
  const [values, setValues] = useState({
    login: "",
    password: "",
    showPassword: false,
    isOpen: false,
    message: "",
    success: false,
    severity: "",
    data: "",
  });
  const userParsed = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers: { "Content-type": "application/json" },
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (userParsed) {
      navigate("/home");
    }
    if (values.data) {
      localStorage.setItem("userInfo", JSON.stringify(values.data));
      navigate("/home");
    }
  }, [values.success]);

  const handleClose = () => {
    setValues({ ...values, isOpen: false });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/users/login",
        { login: values.login, password: values.password },
        config
      );
      setValues({ ...values, data: data, success: true });
    } catch (error) {
      setValues({
        ...values,
        message: error.response.data.error,
        isOpen: true,
        severity: "error",
      });
    }
  };

  return (
    <div className={styles.screen}>
      <div className={styles.box}>
        <div className={styles.inner_box}>
          <div className={styles.forms_wrap}>
            <form onSubmit={submitHandler}>
              <div className={styles.logo}>
                <img src={Marsa} alt="Logo" />
              </div>
              <div className={styles.heading}>
                <h2>Se Connecter</h2>
                <h6>Vous n'avez pas de compte ?</h6>
                <Link to="/register" className={styles.no_decoration}>
                  <span className={styles.toggle}>Inscrivez-vous !</span>
                </Link>
              </div>
              <FormControl variant="standard">
                <InputLabel htmlFor="login">Login</InputLabel>
                <Input
                  required
                  id="login"
                  type="text"
                  value={values.login}
                  onChange={handleChange("login")}
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant="standard">
                <InputLabel htmlFor="password">Mot De Passe</InputLabel>
                <Input
                  required
                  id="password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Link
                to="/forget-password"
                className={styles.no_decoration + " " + styles.forget}
              >
                <span className={styles.toggle}>Forget Password?</span>
              </Link>
              <Button
                variant="contained"
                color="error"
                type="submit"
                sx={{
                  borderRadius: 4,
                  "&:hover": { backgroundColor: "#3b3d3c" },
                }}
              >
                Se Connecter
              </Button>
            </form>
          </div>
          <Carousel />
        </div>
      </div>
      <Notification
        severity={values.severity}
        message={values.message}
        isOpen={values.isOpen}
        onClose={handleClose}
      />
    </div>
  );
}
