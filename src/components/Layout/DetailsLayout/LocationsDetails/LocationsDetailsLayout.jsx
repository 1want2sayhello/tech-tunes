import styles from "./LocationsDetailsLayout.module.scss";

const LocationsDetailsLayout = ({
  heading,
  subheading,
  image,
  description,
  hours,
  contact,
}) => {
  const formatTime = (time) => {
    if (!time || !time.includes(":")) return time;

    const [hour, minute] = time.trim().split(":");
    const hourNum = Number(hour);

    if (Number.isNaN(hourNum)) return time;

    const period = hourNum >= 12 ? "PM" : "AM";
    const formattedHour = hourNum % 12 || 12;

    return `${formattedHour}:${minute} ${period}`;
  };

  const formatHours = (hours) => {
    if (!hours) return hours;

    const parts = hours.split(/\s*[-–—]\s*/);

    if (parts.length !== 2) return hours;

    return `${formatTime(parts[0])} - ${formatTime(parts[1])}`;
  };

  return (
    <section className={styles.locationDetailsLayout}>
      <div className={styles.locationImg}>
        <img
          src={image}
          alt={`${heading} - location - image`}
          width="800"
          height="600"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className={styles.locationDetails}>
        <h2 className={styles.heading}> {heading} </h2>
        {subheading && <h3> {subheading} </h3>}
        {description && <p className={styles.description}> {description} </p>}

        <div className={styles.info}>
          <div className={styles.contact}>
            <h4> Contact Us </h4>
            <p> {contact?.phone} </p>
            <p> {contact?.email} </p>
          </div>
          <div className={styles.hours}>
            <h4> Hours of Operation </h4>
            <ul>
              {Object.entries(hours || {}).map(([day, time]) => (
                <li key={day}>
                  <span>
                    <strong> {day}: </strong>
                  </span>
                  <span>{formatHours(time)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsDetailsLayout;
