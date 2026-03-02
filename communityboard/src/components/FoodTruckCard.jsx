const FoodTruckCard = ({ name, cuisine, neighborhood, menuUrl }) => {
  return (
    <article className="truck-card">
      <h2 className="truck-name">{name}</h2>
      <p className="truck-cuisine">{cuisine}</p>
      <p className="truck-neighborhood">{neighborhood}</p>
      <a
        className="menu-link"
        href={menuUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View menu for ${name}`}
      >
        View Menu
      </a>
    </article>
  );
};

export default FoodTruckCard;
