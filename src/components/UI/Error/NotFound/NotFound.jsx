import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <section className={styles.notFound}>
      <h2> 404: Not Found </h2>
      <p>
        Oops, we hit a snag. Looks like this page isn't valid. Try again with a
        different route.
      </p>
    </section>
  );
};

export default NotFound;
