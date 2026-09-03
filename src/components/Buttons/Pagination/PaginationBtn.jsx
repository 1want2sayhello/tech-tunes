import styles from "../Pagination/PaginationBtn.module.scss";

const PaginationBtn = ({ canGoPrev, canGoNext, goPrev, goNext }) => {
  return (
    <div className={styles.paginationContainer}>
      <button
        type="button"
        className={styles.paginationBtn}
        onClick={goPrev}
        disabled={!canGoPrev}
      >
        &lt; Prev
      </button>
      |
      <button
        type="button"
        className={styles.paginationBtn}
        onClick={goNext}
        disabled={!canGoNext}
      >
        Next &gt;
      </button>
    </div>
  );
};

export default PaginationBtn;
