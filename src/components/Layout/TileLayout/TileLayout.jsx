import styles from "./TileLayout.module.scss";

const TileLayout = ({
  tiles = [],
  className = "",
  fetchPriority,
  loading,
  decoding,
}) => {
  return (
    <div className={`${styles.tileGrid} ${className}`}>
      {tiles.map((tile) => (
        <div
          key={tile.id}
          className={`${styles.tile} ${
            tile.type === "text" ? styles.textTile : styles.imgTile
          } ${styles[tile.variant]}`}
        >
          {tile.type === "text" ? (
            <h2> {tile.content} </h2>
          ) : (
            <img
              src={tile.src}
              alt=""
              width="600"
              height="600"
              fetchPriority={fetchPriority}
              loading={loading}
              decoding={decoding}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default TileLayout;
