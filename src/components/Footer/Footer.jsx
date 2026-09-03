import React from "react";
import { Link } from "react-router-dom";
import Twitter from "../../assets/graphics/socials/twitter.svg";
import TikTok from "../../assets/graphics/socials/tiktok.svg";
import Facebook from "../../assets/graphics/socials/facebook.svg";
import Instagram from "../../assets/graphics/socials/instagram.svg";

import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <div className={styles.header}>
          <h1> Tech Tunes </h1>
        </div>
        <h3> Est 2018 </h3>
        <div className={styles.socials}>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={Instagram}
              alt="visit our instagram"
              width={35}
              height={35}
            />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={Facebook}
              alt="visit our facebook"
              width={35}
              height={35}
            />
          </a>
          <a
            href="https://www.tiktok.com/en/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={TikTok} alt="visit our tiktok" width={35} height={35} />
          </a>
          <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
            <img src={Twitter} alt="visit our twitter" width={35} height={35} />
          </a>
        </div>
      </div>

      <nav className={styles.footerNav}>
        <ul className={styles.list}>
          <li>
            <Link to={"/"}> Home </Link>
          </li>
          <li>
            <Link to={"/music?sort=-dateAdded"}> New Releases </Link>
          </li>
          <li>
            <Link to={"/music?sort=-salesCount"}> Best Sellers </Link>
          </li>
        </ul>
        <ul className={styles.list}>
          <li>
            <Link to={"/music"}> Vinyl Records</Link>{" "}
          </li>
          <li>
            <Link to={"/tech"}> Tech Accessories </Link>
          </li>
          <li>
            <Link to={"/merch"}> Merch & Apparel </Link>
          </li>
        </ul>
        <ul className={`${styles.list} ${styles.lastList}`}>
          <li>
            <Link to={"/learn-more#about"}> About Us </Link>
          </li>
          <li>
            <Link to={"/learn-more#contact"}> Contact Us</Link>
          </li>
          <li>
            <Link to={"/learn-more#locations"}> Our Locations </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
