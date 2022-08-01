import React, { useRef } from "react";

import Track from "../../assets/images/track.svg";
import Manage from "../../assets/images/manage.svg";
import Notify from "../../assets/images/notify.svg";
import styles from "./Carousel.module.css";

export default function Carousel() {
  const bulletRefs = useRef([]);
  const imageRefs = useRef([]);
  const textRef = useRef(null);
  bulletRefs.current = [];
  imageRefs.current = [];

  const addtobulletRefs = (el) => {
    if (el && !bulletRefs.current.includes(el)) {
      bulletRefs.current.push(el);
    }
  };
  const addtoimageRefs = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  const handleBullet = (e) => {
    let index = e.target.dataset.value;
    let currentImage = imageRefs.current[index - 1];
    imageRefs.current.forEach((image) => image.classList.remove(styles.show));
    currentImage.classList.add(styles.show);

    textRef.current.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

    bulletRefs.current.forEach((bull) => bull.classList.remove(styles.active));
    e.target.classList.add(styles.active);
  };
  return (
    <div className={styles.carousel}>
      <div className={styles.images_wrapper}>
        <img
          src={Manage}
          alt="Logo"
          ref={addtoimageRefs}
          className={styles.image + " " + styles.img_1 + " " + styles.show}
        />
        <img
          src={Track}
          alt="Logo"
          ref={addtoimageRefs}
          className={styles.image + " " + styles.img_2}
        />
        <img
          src={Notify}
          alt="Logo"
          ref={addtoimageRefs}
          className={styles.image + " " + styles.img_3}
        />
      </div>
      <div className={styles.text_slider}>
        <div className={styles.text_wrap}>
          <div className={styles.text_group} ref={textRef}>
            <h2>Manage Your Leaves</h2>
            <h2>Track Status Of Leave</h2>
            <h2>Get Notified instantly</h2>
          </div>
        </div>
        <div className={styles.bullets}>
          <span
            className={styles.active}
            data-value="1"
            onClick={handleBullet}
            ref={addtobulletRefs}
          ></span>
          <span
            data-value="2"
            onClick={handleBullet}
            ref={addtobulletRefs}
          ></span>
          <span
            data-value="3"
            onClick={handleBullet}
            ref={addtobulletRefs}
          ></span>
        </div>
      </div>
    </div>
  );
}
