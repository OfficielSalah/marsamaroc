import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import delay from "../../helpers/delay";

import Marsa from "../../assets/images/marsa-email.png";
import Notification from "../../components/Notification";
import styles from "./Reset.module.css";
import Carousel from "../../layout/Carousel/Carousel";

import {
  InputAdornment,
  FormControl,
  IconButton,
  InputLabel,
  Input,
  Button,
} from "@mui/material";
import { VisibilityOff, Visibility, ArrowBack } from "@mui/icons-material";

export default function Reset() {
  const [values, setValues] = useState({
    password: "",
    confirmepassword: "",
    isOpen: false,
    message: "",
    success: false,
    showPassword: false,
    severity: "",
  });
  const location = useLocation();
  const { token, id } = queryString.parse(location.search);
  const config = {
    headers: { "Content-type": "application/json" },
  };
  const navigate = useNavigate();

  const verifyToken = async () => {
    try {
      await axios.get(
        `/api/users/verify-token?token=${token}&id=${id}`,
        config
      );
    } catch (error) {
      setValues({
        ...values,
        message: error.response.data.error,
        isOpen: true,
        severity: "warning",
      });
    }
  };

  const redirect = async () => {
    setValues({
      ...values,
      message: "Congratulation , You Will be redirected to the login page",
      isOpen: true,
      severity: "success",
    });
    await delay(3000);
    navigate("/login");
  };

  useEffect(() => {
    if (values.success) {
      redirect();
    } else {
      verifyToken();
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
        await axios.post(
          `/api/users/reset-password?token=${token}&id=${id}`,
          {
            password: values.password,
          },
          config
        );
        setValues({ ...values, success: true });
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
                <h3>Changer Mot De Passe</h3>
                <h6>
                  Votre Nouveau Mot De Passe Doit être Différent Du Mot De Passe
                  précédent.
                </h6>
              </div>
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
                Changer Mot De Passe
              </Button>
              <Link to="/" className={styles.link}>
                <ArrowBack color="disabled" />
                <span className={styles.toggle}>
                  Retour à La Page D'accueil
                </span>
              </Link>
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
