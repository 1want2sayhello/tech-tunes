import { useEffect, useState } from "react";
import styles from "./SlideShow.module.scss";

import DjoSlide from "../../assets/images/slides/djo.jpg";
import JojiSlide from "../../assets/images/slides/joji.jpg";
import NirvanaSlide from "../../assets/images/slides/nirvana.webp";
import WeezerSlide from "../../assets/images/slides/weezer.jpeg";
import PostMaloneSlide from "../../assets/images/slides/post-malone.jpg";
import KendrickSlide from "../../assets/images/slides/kendrick-lamar.jpg";
import TwentyOnePilotsSlide from "../../assets/images/slides/twenty-one-pilots.jpg";

const slides = [
  DjoSlide,
  JojiSlide,
  NirvanaSlide,
  PostMaloneSlide,
  TwentyOnePilotsSlide,
  KendrickSlide,
  WeezerSlide,
];

const SlideShow = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibility = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (!isVisible || slides.length <= 1) return;

    const interval = setInterval(() => {
      setVisible(false);
    }, 5000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const handleTransitionEnd = () => {
    if (event.propertyName !== "opacity") return;
    if (visible) return;

    setIndex((prev) => (prev + 1) % slides.length);
    setVisible(true);
  };

  if (!slides.length) return null;

  return (
    <div className={styles.slideShow}>
      <img
        className={`${styles.slideImg} ${visible ? styles.visible : styles.hidden}`}
        src={slides[index]}
        onTransitionEnd={handleTransitionEnd}
        alt="Featured Slide"
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
};

export default SlideShow;
