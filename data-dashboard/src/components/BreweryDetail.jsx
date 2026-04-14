function BreweryDetail({
  brewery,
  detailUrl,
  onBackToDashboard,
  breweriesInSameCity,
  breweriesOfSameType,
  formatLabel,
}) {
  if (!brewery) {
    return (
      <section className="detail-view">
        <div className="detail-hero">
          <div>
            <p className="detail-kicker">Detail View</p>
            <h2 className="detail-title">Brewery not found</h2>
            <p className="detail-subtitle">
              The selected brewery is not available in the current API response.
            </p>
          </div>

          <button
            className="sidebar-button"
            type="button"
            onClick={onBackToDashboard}
          >
            Back to dashboard
          </button>
        </div>
      </section>
    );
  }

  const streetAddress = brewery.address_1 || brewery.street || "Not listed";
  const typeLabel = brewery.brewery_type
    ? formatLabel(brewery.brewery_type)
    : "Unknown";
  const fullLocation = [streetAddress, brewery.city, brewery.state, brewery.postal_code]
    .filter(Boolean)
    .join(", ");
  const mapLink = fullLocation
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        fullLocation
      )}`
    : null;

  const detailFields = [
    ["Brewery ID", brewery.id || "Not listed"],
    ["Type", typeLabel],
    ["Street Address", streetAddress],
    ["City", brewery.city || "Not listed"],
    ["State", brewery.state || brewery.state_province || "Not listed"],
    ["Postal Code", brewery.postal_code || "Not listed"],
    ["Country", brewery.country || "Not listed"],
    ["Phone", brewery.phone || "Not listed"],
    ["Latitude", brewery.latitude || "Not listed"],
    ["Longitude", brewery.longitude || "Not listed"],
  ];

  return (
    <section className="detail-view">
      <div className="detail-hero">
        <div>
          <p className="detail-kicker">Detail View</p>
          <h2 className="detail-title">{brewery.name}</h2>
          <p className="detail-subtitle">
            A dedicated brewery page with extra location and profile data that is
            not shown on the dashboard cards.
          </p>
        </div>

        <button
          className="sidebar-button"
          type="button"
          onClick={onBackToDashboard}
        >
          Back to dashboard
        </button>
      </div>

      <div className="detail-metrics">
        <article className="metric-card">
          <p className="metric-label">Same city</p>
          <h3>{breweriesInSameCity}</h3>
          <p className="metric-help">
            Breweries from the full dataset that share this brewery&apos;s city.
          </p>
        </article>

        <article className="metric-card">
          <p className="metric-label">Same type</p>
          <h3>{breweriesOfSameType}</h3>
          <p className="metric-help">
            Breweries from the full dataset that share this brewery&apos;s type.
          </p>
        </article>
      </div>

      <div className="detail-grid">
        <article className="detail-panel">
          <h3>Profile Details</h3>

          <div className="detail-field-grid">
            {detailFields.map(([label, value]) => (
              <div className="detail-field" key={label}>
                <p className="detail-field-label">{label}</p>
                <p className="detail-field-value">{value}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="detail-panel">
          <h3>Links and Direct URL</h3>

          <div className="detail-link-list">
            <div className="detail-field">
              <p className="detail-field-label">Direct detail URL</p>
              <a className="detail-anchor" href={detailUrl}>
                {detailUrl}
              </a>
            </div>

            <div className="detail-field">
              <p className="detail-field-label">Website</p>
              {brewery.website_url ? (
                <a
                  className="detail-anchor"
                  href={brewery.website_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit brewery website
                </a>
              ) : (
                <p className="detail-field-value">Not listed</p>
              )}
            </div>

            <div className="detail-field">
              <p className="detail-field-label">Map lookup</p>
              {mapLink ? (
                <a
                  className="detail-anchor"
                  href={mapLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open address in Google Maps
                </a>
              ) : (
                <p className="detail-field-value">Address not available</p>
              )}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default BreweryDetail;
