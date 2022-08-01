import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Marsa from "../../assets/images/marsa-email.png";
import Notification from "../../components/Notification";
import styles from "./Forget.module.css";
import Carousel from "../../layout/Carousel/Carousel";

import {
  InputAdornment,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@mui/material";
import { AlternateEmail, ArrowBack } from "@mui/icons-material";

export default function Forget() {
  const [values, setValues] = useState({
    email: "",
    isOpen: false,
    message: "",
    success: false,
    data: "",
    severity: "",
  });
  const config = {
    headers: { "Content-type": "application/json" },
  };

  useEffect(() => {
    if (values.success) {
      setValues({
        ...values,
        message: "Password reset link is sent to your email",
        isOpen: true,
        severity: "success",
      });
    }
  }, [values.success]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/users/forget-password",
        { email: values.email },
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
  };

  const handleClose = () => {
    setValues({ ...values, isOpen: false });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
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
                <h3>Mot De Passe Oublié ?</h3>
                <h6>Ne Vous Inquiétez Pas, Nous Pouvons Vous Aider.</h6>
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
                Envoyer Mail
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
