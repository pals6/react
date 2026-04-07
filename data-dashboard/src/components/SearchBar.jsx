function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="control-card">
      <label className="control-label" htmlFor="search">
        Search breweries
      </label>
      <input
        id="search"
        className="control-input"
        type="text"
        placeholder="Search by name or city"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;
