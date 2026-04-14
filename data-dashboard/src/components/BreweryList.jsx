function BreweryList({ breweries, onSelectBrewery }) {
  const handleCardKeyDown = (event, breweryId) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelectBrewery(breweryId);
    }
  };

  if (breweries.length === 0) {
    return (
      <p className="status-message">
        No breweries match your current search and filter combination.
      </p>
    );
  }

  return (
    <section className="brewery-grid">
      {breweries.map((brewery) => (
        <article
          className="brewery-card interactive-card"
          key={brewery.id}
          role="link"
          tabIndex={0}
          onClick={() => onSelectBrewery(brewery.id)}
          onKeyDown={(event) => handleCardKeyDown(event, brewery.id)}
        >
          <div className="card-top">
            <div className="card-eyebrow-row">
              <p className="brewery-type">{brewery.brewery_type || "unknown"}</p>
              <p className="card-hint">Open detail view</p>
            </div>
            <h3>{brewery.name}</h3>
          </div>

          <div className="card-details">
            <p>
              <span className="detail-label">City:</span> {brewery.city}
            </p>
            <p>
              <span className="detail-label">State:</span> {brewery.state}
            </p>
            <p>
              <span className="detail-label">ZIP:</span>{" "}
              {brewery.postal_code?.match(/\d{5}/)?.[0] || "Not listed"}
            </p>
            <p>
              <span className="detail-label">Phone:</span>{" "}
              {brewery.phone || "Not listed"}
            </p>
          </div>

          <div className="card-actions">
            <button
              className="details-button"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onSelectBrewery(brewery.id);
              }}
            >
              View details
            </button>

            {brewery.website_url ? (
              <a
                className="visit-link"
                href={brewery.website_url}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
              >
                Visit website
              </a>
            ) : (
              <p className="visit-link muted-link">No website available</p>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}

export default BreweryList;
