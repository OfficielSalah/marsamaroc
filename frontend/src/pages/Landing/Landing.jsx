import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import Marsa from "../../assets/images/marsa-email.png";
import Travel from "../../assets/images/Traveling-pana.svg";

export default function Landing() {
  const handleFocus = (e) => {
    e.target.classList.add(styles.active);
  };

  const handleBlur = (e) => {
    if (e.target.value !== "") return;
    e.target.classList.remove(styles.active);
  };
  return (
    <div className={styles.screen}>
      <div className={styles.box}>
        <div className={styles.inner_box}>
          <div className={styles.forms_wrap}>
            <form className={styles.form_wrap}>
              <div className={styles.logo}>
                <img src={Marsa} alt="Logo" />
              </div>
              <div className={styles.heading}>
                <h2>Sign In</h2>
                <h6>Not registred yet ?</h6>
                <Link to="/register">
                  <span className={styles.toggle}>Sign Up</span>
                </Link>
              </div>
              <div className={styles.form}>
                <div className={styles.input_wrap}>
                  <input
                    type="text"
                    name="login"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={styles.input_field}
                    required
                  />
                  <label>Name</label>
                </div>
                <div className={styles.input_wrap}>
                  <input
                    type="password"
                    name="password"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={styles.input_field}
                    required
                  />
                  <label>Password</label>
                </div>
                <input
                  type="submit"
                  value="Sign In"
                  className={styles.submit}
                />{" "}
                <Link to="/forget-password">
                  <span>Forget Password?</span>
                </Link>
              </div>
            </form>
          </div>
          <div className={styles.right}>
            <div className={styles.travel}>
              <img src={Travel} alt="Logo" />
            </div>
            <h1 className={styles.main_title + " " + styles.text_center}>
              Bienvenue sur votre compte
            </h1>
            <p className={styles.main_para + " " + styles.text_center}>
              Gestion Du Centre De Vacances
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
