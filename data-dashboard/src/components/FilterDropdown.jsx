function FilterDropdown({ selectedType, options, onFilterChange }) {
  return (
    <div className="control-card">
      <label className="control-label" htmlFor="type-filter">
        Filter by brewery type
      </label>
      <select
        id="type-filter"
        className="control-input"
        value={selectedType}
        onChange={(event) => onFilterChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option === "all" ? "All Types" : option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterDropdown;
