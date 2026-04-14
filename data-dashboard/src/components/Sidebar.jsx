import Header from "./Header";
import StatsCards from "./StatsCards";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import ZipRangeFilter from "./ZipRangeFilter";

function Sidebar({
  storyMessage,
  stats,
  searchTerm,
  onSearchChange,
  selectedType,
  breweryTypes,
  selectedCity,
  cityOptions,
  onTypeChange,
  onCityChange,
  minZip,
  maxZip,
  onMinZipChange,
  onMaxZipChange,
  onResetFilters,
  isDetailView,
  selectedBrewery,
  onGoHome,
}) {
  return (
    <aside className="sidebar">
      <Header />

      <section className="sidebar-card route-card">
        <p className="route-label">Current View</p>
        <h2 className="route-title">
          {isDetailView ? "Brewery Detail Page" : "Dashboard Overview"}
        </h2>
        <p className="route-text">
          {isDetailView && selectedBrewery
            ? `${selectedBrewery.name} is open in the detail panel, while the same sidebar stays available for filtering and context.`
            : "Use the filters to shape the dashboard, then click a brewery card to open its dedicated URL and full detail view."}
        </p>

        <div className="sidebar-action-row">
          {isDetailView && (
            <button className="sidebar-button" type="button" onClick={onGoHome}>
              Back to dashboard
            </button>
          )}

          <button
            className="sidebar-button secondary-button"
            type="button"
            onClick={onResetFilters}
          >
            Reset filters
          </button>
        </div>
      </section>

      <section className="story-panel">
        <p className="story-label">What This Snapshot Shows</p>
        <p className="story-text">{storyMessage}</p>
      </section>

      <StatsCards stats={stats} />

      <section className="controls-section">
        <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
        <FilterDropdown
          controlId="type-filter"
          label="Filter by brewery type"
          selectedValue={selectedType}
          options={breweryTypes}
          allLabel="All Types"
          onFilterChange={onTypeChange}
          formatOption={(option) =>
            option
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")
          }
        />
        <FilterDropdown
          controlId="city-filter"
          label="Filter by city"
          selectedValue={selectedCity}
          options={cityOptions}
          allLabel="All Cities"
          onFilterChange={onCityChange}
        />
        <ZipRangeFilter
          minZip={minZip}
          maxZip={maxZip}
          onMinZipChange={onMinZipChange}
          onMaxZipChange={onMaxZipChange}
        />
      </section>
    </aside>
  );
}

export default Sidebar;
