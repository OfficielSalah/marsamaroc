import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Marsa from "../../assets/images/marsa-email.png";
import Notification from "../../components/Notification";
import styles from "./Register.module.css";
import Carousel from "../../layout/Carousel/Carousel";
import delay from "../../helpers/delay";

import {
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@mui/material";
import {
  VisibilityOff,
  Visibility,
  AccountCircle,
  AlternateEmail,
} from "@mui/icons-material";

export default function Register() {
  const [values, setValues] = useState({
    login: "",
    email: "",
    password: "",
    confirmepassword: "",
    showPassword: false,
    isOpen: false,
    message: "",
    success: false,
    data: "",
    severity: "",
  });
  const userParsed = JSON.parse(localStorage.getItem("userInfo"));
  const registerInfo = localStorage.getItem("registerInfo");
  const config = {
    headers: { "Content-type": "application/json" },
  };
  const navigate = useNavigate();

  const redirect = async () => {
    localStorage.setItem("registerInfo", JSON.stringify(values.data));
    setValues({
      ...values,
      message:
        "Congratulation , a confirmation code had been sent to your address email",
      isOpen: true,
      severity: "success",
    });
    await delay(3000);
    setValues({
      ...values,
      message:
        "you will be redirected to the email verification page after a moment ...",
      isOpen: true,
      severity: "success",
    });
    await delay(3000);
    navigate("/verify-email");
  };

  useEffect(() => {
    if (userParsed) {
      navigate("/home");
    }
    if (registerInfo) {
      redirect();
    }
    if (values.success) {
      redirect();
    }
  }, [values.success]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (values.password !== values.confirmepassword) {
      setValues({
        ...values,
        message: "Password does not match !",
        isOpen: true,
        severity: "warning",
      });
    } else {
      try {
        const { data } = await axios.post(
          "/api/users/register",
          {
            login: values.login,
            password: values.password,
            email: values.email,
          },
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
    }
  };

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
                <h3>Créer Un Compte</h3>
                <h6>Vous avez un compte ?</h6>
                <Link to="/login" className={styles.no_decoration}>
                  <span className={styles.toggle}>Connectez-vous !</span>
                </Link>
              </div>
              <FormControl variant="standard">
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  required
                  id="email"
                  type="text"
                  value={values.email}
                  onChange={handleChange("email")}
                  startAdornment={
                    <InputAdornment position="start">
                      <AlternateEmail />
                    </InputAdornment>
                  }
                />
              </FormControl>
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
              <FormControl variant="standard">
                <InputLabel htmlFor="confirmepassword">
                  Confirmer Mot De Passe
                </InputLabel>
                <Input
                  required
                  id="confirmepassword"
                  type={values.showPassword ? "text" : "password"}
                  value={values.confirmepassword}
                  onChange={handleChange("confirmepassword")}
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
              <Button
                variant="contained"
                color="error"
                type="submit"
                sx={{
                  mt: 3,
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
