import Modal from "../Modal/Modal";
import styles from "./DemoModal.module.scss";
const DemoModal = ({ isOpen, onClose, onContinue }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="This is a demo project">
      <div>
        <p>
          No real payment will be processed. <br /> Hit continue to complete the
          demo, or go back to return to cart.
        </p>
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={onClose}>
          Go Back
        </button>
        <button type="button" onClick={onContinue}>
          Continue
        </button>
      </div>
    </Modal>
  );
};

export default DemoModal;
