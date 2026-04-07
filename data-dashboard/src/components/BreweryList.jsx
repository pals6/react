function BreweryList({ breweries }) {
  if (breweries.length === 0) {
    return (
      <p className="status-message">No breweries match your current search.</p>
    );
  }

  return (
    <section className="brewery-grid">
      {breweries.map((brewery) => (
        // map() lets us turn each brewery object into a card on the page.
        <article className="brewery-card" key={brewery.id}>
          <div className="card-top">
            <p className="brewery-type">{brewery.brewery_type || "unknown"}</p>
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
              <span className="detail-label">Phone:</span>{" "}
              {brewery.phone || "Not listed"}
            </p>
          </div>

          {brewery.website_url ? (
            <a
              className="visit-link"
              href={brewery.website_url}
              target="_blank"
              rel="noreferrer"
            >
              Visit website
            </a>
          ) : (
            <p className="visit-link muted-link">No website available</p>
          )}
        </article>
      ))}
    </section>
  );
}

export default BreweryList;
