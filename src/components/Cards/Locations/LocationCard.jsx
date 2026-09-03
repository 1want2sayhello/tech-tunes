import styles from "./LocationCard.module.scss";

const LocationCard = ({ location }) => {
  const { name, address, contact, images } = location;
  return (
    <div className={styles.locationCard}>
      <div className={styles.locationImg}>
        <img src={images.thumbnail} alt="" />
      </div>
      <h2> {name} </h2>
      <p>
        {address.street} <br />
        {address.city}, {address.state} {address.zip}
      </p>
      <p>
        {contact.phone} <br />
        {contact.email}
      </p>
    </div>
  );
};

export default LocationCard;
