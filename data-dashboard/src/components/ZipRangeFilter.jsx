function ZipRangeFilter({ minZip, maxZip, onMinZipChange, onMaxZipChange }) {
  return (
    <div className="control-card zip-range-card">
      <p className="control-label">Filter by ZIP code bounds</p>

      <div className="range-grid">
        <label className="range-field" htmlFor="min-zip">
          <span className="range-label">Min ZIP</span>
          <input
            id="min-zip"
            className="control-input"
            type="number"
            inputMode="numeric"
            min="10000"
            max="14999"
            placeholder="10001"
            value={minZip}
            onChange={(event) => onMinZipChange(event.target.value)}
          />
        </label>

        <label className="range-field" htmlFor="max-zip">
          <span className="range-label">Max ZIP</span>
          <input
            id="max-zip"
            className="control-input"
            type="number"
            inputMode="numeric"
            min="10000"
            max="14999"
            placeholder="14901"
            value={maxZip}
            onChange={(event) => onMaxZipChange(event.target.value)}
          />
        </label>
      </div>

      <p className="control-help">
        Use New York ZIP codes to narrow the dashboard to a smaller region.
      </p>
    </div>
  );
}

export default ZipRangeFilter;
