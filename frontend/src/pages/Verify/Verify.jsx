import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Marsa from "../../assets/images/marsa-email.png";
import Notification from "../../components/Notification";
import styles from "./Verify.module.css";
import Carousel from "../../layout/Carousel/Carousel";
import delay from "../../helpers/delay";

import {
  InputAdornment,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@mui/material";
import { AlternateEmail, ArrowBack } from "@mui/icons-material";

export default function Verify() {
  const [values, setValues] = useState({
    otp: "",
    isOpen: false,
    message: "",
    severity: "",
    success: false,
  });

  const userParsed = JSON.parse(localStorage.getItem("userInfo"));
  const registerInfo = JSON.parse(localStorage.getItem("registerInfo"));
  const user_Id = registerInfo?._id;
  const config = {
    headers: { "Content-type": "application/json" },
  };

  const navigate = useNavigate();

  const redirect = async () => {
    setValues({
      ...values,
      message: "Congratulation ,votre address email est vérifier .",
      isOpen: true,
      severity: "success",
    });
    await delay(3000);
    setValues({
      ...values,
      message: "you will be redirected to the login page after a moment ...",
      isOpen: true,
      severity: "success",
    });
    await delay(3000);
    navigate("/login");
  };

  useEffect(() => {
    if (userParsed) {
      navigate("/home");
    }
    if (values.success) {
      redirect();
    }
  }, [values.success]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/users/verify-email",
        { user_Id: user_Id, otp: values.otp },
        config
      );
      localStorage.removeItem("registerInfo");
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
                <h3>Vérifier Votre Email</h3>
                <h6>Le Code OTP Est Envoyée A Votre Boite Email.</h6>
              </div>
              <FormControl variant="standard">
                <InputLabel htmlFor="otp">Code OTP</InputLabel>
                <Input
                  required
                  id="otp"
                  type="text"
                  value={values.otp}
                  onChange={handleChange("otp")}
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
                Vérifier
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
