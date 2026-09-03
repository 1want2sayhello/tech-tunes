import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchLocations } from "../../services/locationService";
import LocationCard from "../../components/Cards/Locations/LocationCard";

import storeFront from "../../assets/images/about/vintage-store-front.webp";
import aboutHero from "../../assets/images/about/about-hero.webp";
import ErrorMessage from "../../components/UI/Error/ErrorMessage";
import styles from "./LearnMore.module.scss";

const LearnMore = () => {
  const {
    data: locations = [],
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["locations"],
    queryFn: fetchLocations,
  });

  if (isError)
    return (
      <ErrorMessage resource="our locations" onRetry={refetch} error={error} />
    );

  return (
    <section className={styles.LearnMore}>
      <section id="about" className={`${styles.about} ${styles.section}`}>
        <div className={styles.intro}>
          <div className={styles.introMain}>
            <div className={styles.introContent}>
              <div className={styles.mainHeader}>
                <h2> About Tech Tunes </h2>
                <h4>
                  Tech Tunes is every audiophile's
                  <span className={styles.gradientText}> dream </span> music
                  store.
                </h4>
                <h4>
                  We're built for folks who care about how their music sounds.
                </h4>
              </div>

              <div className={styles.content}>
                <p>
                  Our stores are stocked with <span> everything music </span> -
                  from vintage equipment to modern mixers & amps to produce the
                  next big hit, to our curated
                  <span> vinyl record selection</span>, right down to our own in
                  house swag.
                </p>
              </div>
            </div>

            <div className={styles.introImg}>
              <div className={styles.imgContainer}>
                <img src={aboutHero} alt="intro-about-hero" />
              </div>
            </div>
          </div>
          <div className={styles.introBottom}>
            <h6>
              We pride ourselves in offering expertise in
              <span> retro & modern equipment </span>
              <br />
              along with providing quality customer service.
            </h6>
          </div>
        </div>
      </section>

      <section
        id="locations"
        className={`${styles.locations} ${styles.section}`}
      >
        <div className={styles.verticalHeader}>
          <h2> Locations </h2>
        </div>
        <section className={`${styles.section} ${styles.newHero}`}>
          <div className={styles.splatter}>
            <div className={styles.rays}>
              <div></div>
            </div>
            <div className={styles.sun}></div>
            <div className={styles.storeFront}>
              <img src={storeFront} alt="vintage store front" />
            </div>
          </div>
        </section>

        <div className={`${styles.locationsGrid}`}>
          {locations.map((location) => (
            <Link to={`/locations/${location.slug}`} key={location.id}>
              <LocationCard location={location} />
            </Link>
          ))}
        </div>
      </section>
      <section id="contact" className={`${styles.contact} ${styles.section}`}>
        <h2> Have a Question or Concern? </h2>
        <h3>
          We also take vinyl suggestions! Let us know what artists you'd like to
          see!
        </h3>
        <div className={styles.email}>
          Contact us via email:
          <a href="mailto:contactus@techtunes.com"> contactus@techtunes.com </a>
        </div>
      </section>
    </section>
  );
};

export default LearnMore;
