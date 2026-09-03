import { useState, useEffect, useRef } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import Logo from "../../assets/graphics/logo.webp";
import MobileNav from "./MobileNav";
import { useCart } from "../../context/useCart";
import SearchIcon from "../../assets/graphics/search-icon.png";
import EmptyCartIcon from "../../assets/graphics/empty-cart.png";
import AddedCartIcon from "../../assets/graphics/added-cart.png";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { cartItems } = useCart();

  const hamburgerRef = useRef(null);
  const wasMenuOpen = useRef(false);

  const isSearchPage = location.pathname === "/search";

  const activeSearchQuery = searchParams.get("q") || "";

  useEffect(() => {
    if (wasMenuOpen.current && !isOpen) {
      hamburgerRef.current?.focus();
    }

    wasMenuOpen.current = isOpen;
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const trimmedQuery = formData.get("search")?.trim();
    if (!trimmedQuery) return;
    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  const totalCartItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className={styles.Navbar}>
      <div className={styles.navTop}>
        <div className={styles.navLogo}>
          <Link to="/">
            <img
              src={Logo}
              alt="tech-tunes-logo"
              width="160"
              height="80"
              decoding="async"
            />
          </Link>
        </div>
        <div className={styles.navActions}>
          <div className={styles.navLinks}>
            <ul>
              <li>
                <Link to="/music"> Vinyl </Link>
              </li>
              <li>
                <Link to="/tech"> Tech </Link>
              </li>
              <li>
                <Link to="/merch"> Merch </Link>{" "}
              </li>
              <li>
                <Link to="/learn-more"> Learn More </Link>
              </li>
              <li>
                <div className={styles.cartIcon}>
                  <Link
                    to="/cart"
                    aria-label={`View cart, ${totalCartItems} ${
                      totalCartItems === 1 ? "item" : "items"
                    }`}
                  >
                    <img
                      src={totalCartItems > 0 ? AddedCartIcon : EmptyCartIcon}
                      alt=""
                    />
                    <span className={styles.cartCount} aria-hidden="true">
                      {totalCartItems > 0 ? totalCartItems : ""}
                    </span>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.mobileActions}>
          <div className={styles.cartIcon}>
            <Link
              to="/cart"
              aria-label={`View cart, ${totalCartItems} ${
                totalCartItems === 1 ? "item" : "items"
              }`}
            >
              <img
                src={totalCartItems > 0 ? AddedCartIcon : EmptyCartIcon}
                alt=""
              />
              <span className={styles.cartCount} aria-hidden="true">
                {totalCartItems > 0 ? totalCartItems : ""}
              </span>
            </Link>
          </div>
          <button
            ref={hamburgerRef}
            type="button"
            aria-expanded={isOpen}
            aria-label={
              isOpen ? "Close Navigation Menu" : "Open Navigation Menu"
            }
            aria-controls="mobile-navigation"
            className={styles.hamburgerIcon}
            onClick={toggleMenu}
          >
            <span className={styles.burger}></span>
            <span className={styles.burger}></span>
            <span className={styles.burger}></span>
          </button>
        </div>
      </div>
      <div className={styles.navBottom}>
        <div className={styles.search}>
          <div className={styles.searchIcon}>
            <img src={SearchIcon} alt="" />
          </div>
          <form onSubmit={handleSubmit} className={styles.searchForm}>
            <input
              aria-label="Search products"
              key={isSearchPage ? activeSearchQuery : "non-search"}
              name="search"
              type="text"
              placeholder="Search for your sound..."
              defaultValue={isSearchPage ? activeSearchQuery : ""}
            />
          </form>
        </div>
      </div>
      <MobileNav isOpen={isOpen} toggleMenu={toggleMenu} />
    </nav>
  );
};

export default Navbar;
