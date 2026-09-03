import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./MobileNav.module.scss";

const MobileNav = ({ isOpen, toggleMenu }) => {
  const navRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !navRef.current) return;

    const focusableElements = navRef.current.querySelectorAll(
      "button:not([disabled]), a[href]",
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        toggleMenu();
        return;
      }

      if (e.key !== "Tab" || !firstElement || !lastElement) return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    const menu = navRef.current;
    menu.addEventListener("keydown", handleKeyDown);

    return () => {
      menu.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, toggleMenu]);

  return (
    <nav
      ref={navRef}
      id="mobile-navigation"
      aria-hidden={!isOpen}
      aria-label="Mobile navigation"
      inert={!isOpen}
      className={`${styles.mobileNav} ${isOpen ? styles.isOpen : ""}`}
    >
      <button type="button" className={styles.closeBtn} onClick={toggleMenu}>
        Close
      </button>
      <ul className={styles.dropdown}>
        <li>
          <Link to="/" onClick={toggleMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/music" onClick={toggleMenu}>
            Vinyl
          </Link>
        </li>
        <li>
          <Link to="/tech" onClick={toggleMenu}>
            Tech
          </Link>
        </li>
        <li>
          <Link to="/merch" onClick={toggleMenu}>
            Merch
          </Link>
        </li>
        <li>
          <Link to="/learn-more" onClick={toggleMenu}>
            Learn More
          </Link>
        </li>
        <li>
          <Link to="/cart" onClick={toggleMenu}>
            Your Cart
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNav;
