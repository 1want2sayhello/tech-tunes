import styles from "./ErrorMessage.module.scss";

const ErrorMessage = ({ resource = "", error, onRetry }) => {
  return (
    <section className={styles.errorResults} role="alert">
      <h2> We couldn't load {resource} </h2>
      <p> Reason: {error?.message ?? "something unexpected occured."}</p>

      {onRetry && (
        <button type="button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </section>
  );
};

export default ErrorMessage;
