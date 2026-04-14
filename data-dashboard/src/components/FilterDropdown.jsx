function FilterDropdown({
  controlId,
  label,
  selectedValue,
  options,
  allLabel,
  onFilterChange,
  formatOption = (option) => option,
}) {
  return (
    <div className="control-card">
      <label className="control-label" htmlFor={controlId}>
        {label}
      </label>
      <select
        id={controlId}
        className="control-input"
        value={selectedValue}
        onChange={(event) => onFilterChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option === "all" ? allLabel : formatOption(option)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterDropdown;
