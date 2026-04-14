import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import DashboardCharts from "./components/DashboardCharts";
import BreweryList from "./components/BreweryList";
import BreweryDetail from "./components/BreweryDetail";
import "./App.css";

const chartPalette = [
  "#1f6b4d",
  "#2f8f68",
  "#57a67e",
  "#83c19d",
  "#f1b167",
  "#ef8c69",
];

const getSelectedBreweryIdFromHash = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const hashPath = window.location.hash.replace(/^#/, "");
  const routeMatch = hashPath.match(/^\/brewery\/(.+)$/);

  return routeMatch ? decodeURIComponent(routeMatch[1]) : null;
};

const formatLabel = (value) =>
  value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const extractZipCode = (postalCode) => {
  const zipMatch = postalCode?.match(/\d{5}/);
  return zipMatch ? Number(zipMatch[0]) : null;
};

function App() {
  const [breweries, setBreweries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [minZip, setMinZip] = useState("");
  const [maxZip, setMaxZip] = useState("");
  const [selectedBreweryId, setSelectedBreweryId] = useState(() =>
    getSelectedBreweryIdFromHash()
  );
  const [visibleCharts, setVisibleCharts] = useState({
    citySpread: true,
    typeDistribution: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await fetch(
          "https://api.openbrewerydb.org/v1/breweries?by_state=new_york&per_page=50"
        );

        if (!response.ok) {
          throw new Error("The brewery data could not be loaded.");
        }

        const data = await response.json();
        setBreweries(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBreweries();
  }, []);

  useEffect(() => {
    const syncRouteWithHash = () => {
      setSelectedBreweryId(getSelectedBreweryIdFromHash());
    };

    syncRouteWithHash();
    window.addEventListener("hashchange", syncRouteWithHash);

    return () => {
      window.removeEventListener("hashchange", syncRouteWithHash);
    };
  }, []);

  const breweryTypes = [
    "all",
    ...new Set(
      breweries
        .map((brewery) => brewery.brewery_type)
        .filter(Boolean)
        .sort()
    ),
  ];

  const cityOptions = [
    "all",
    ...new Set(
      breweries
        .map((brewery) => brewery.city)
        .filter(Boolean)
        .sort((firstCity, secondCity) => firstCity.localeCompare(secondCity))
    ),
  ];

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const minimumZip = minZip ? Number(minZip) : null;
  const maximumZip = maxZip ? Number(maxZip) : null;

  const filteredBreweries = breweries.filter((brewery) => {
    const zipCode = extractZipCode(brewery.postal_code);
    const searchableText =
      `${brewery.name || ""} ${brewery.city || ""}`.toLowerCase();

    const matchesSearch = searchableText.includes(normalizedSearchTerm);
    const matchesType =
      selectedType === "all" || brewery.brewery_type === selectedType;
    const matchesCity = selectedCity === "all" || brewery.city === selectedCity;
    const matchesMinimumZip =
      minimumZip === null || (zipCode !== null && zipCode >= minimumZip);
    const matchesMaximumZip =
      maximumZip === null || (zipCode !== null && zipCode <= maximumZip);

    return (
      matchesSearch &&
      matchesType &&
      matchesCity &&
      matchesMinimumZip &&
      matchesMaximumZip
    );
  });

  const breweriesWithWebsites = filteredBreweries.filter(
    (brewery) => brewery.website_url
  ).length;

  const uniqueCities = new Set(
    filteredBreweries.map((brewery) => brewery.city).filter(Boolean)
  ).size;

  const cityCounts = filteredBreweries.reduce((counts, brewery) => {
    const currentCity = brewery.city || "Unknown";
    counts[currentCity] = (counts[currentCity] || 0) + 1;
    return counts;
  }, {});

  const typeCounts = filteredBreweries.reduce((counts, brewery) => {
    const currentType = brewery.brewery_type || "unknown";
    counts[currentType] = (counts[currentType] || 0) + 1;
    return counts;
  }, {});

  const topCitiesData = Object.entries(cityCounts)
    .sort((firstEntry, secondEntry) => secondEntry[1] - firstEntry[1])
    .slice(0, 6)
    .map(([city, count], index) => ({
      label: city,
      value: count,
      color: chartPalette[index % chartPalette.length],
    }));

  const typeDistributionData = Object.entries(typeCounts)
    .sort((firstEntry, secondEntry) => secondEntry[1] - firstEntry[1])
    .map(([type, count], index) => ({
      label: formatLabel(type),
      value: count,
      color: chartPalette[index % chartPalette.length],
    }));

  const topCityEntry = topCitiesData[0] || null;
  const mostCommonType =
    typeDistributionData.length === 0 ? "No results" : typeDistributionData[0].label;

  const activeFilterSummary = [
    selectedType !== "all" ? `type: ${formatLabel(selectedType)}` : null,
    selectedCity !== "all" ? `city: ${selectedCity}` : null,
    minimumZip !== null ? `ZIP >= ${minimumZip}` : null,
    maximumZip !== null ? `ZIP <= ${maximumZip}` : null,
  ]
    .filter(Boolean)
    .join(", ");

  const storyMessage =
    filteredBreweries.length === 0
      ? "No breweries match the current filters. Try another search term, choose a different city or brewery type, or widen the ZIP-code bounds."
      : `${mostCommonType} breweries lead this view, and ${
          topCityEntry
            ? `${topCityEntry.label} currently has the highest concentration with ${topCityEntry.value}.`
            : "city spread is currently flat."
        } The filtered results cover ${uniqueCities} ${
          uniqueCities === 1 ? "city" : "cities"
        }, and ${breweriesWithWebsites} breweries include a website.${
          activeFilterSummary ? ` Active filters: ${activeFilterSummary}.` : ""
        }`;

  const stats = [
    {
      label: "Breweries Shown",
      value: filteredBreweries.length,
      helpText: `Showing ${filteredBreweries.length} of ${breweries.length} breweries`,
    },
    {
      label: "Cities Represented",
      value: uniqueCities,
      helpText: "How many New York cities appear in the current results",
    },
    {
      label: "Website Links",
      value: breweriesWithWebsites,
      helpText: "Breweries in the current view that list a website",
    },
    {
      label: "Most Common Type",
      value: mostCommonType,
      helpText: "The brewery style that appears most often right now",
    },
  ];

  const selectedBrewery =
    breweries.find((brewery) => String(brewery.id) === String(selectedBreweryId)) ||
    null;

  const isDetailView = selectedBreweryId !== null;

  const detailUrl =
    typeof window === "undefined" || !selectedBreweryId
      ? ""
      : `${window.location.origin}${window.location.pathname}#/brewery/${encodeURIComponent(
          selectedBreweryId
        )}`;

  const breweriesInSameCity = selectedBrewery
    ? breweries.filter((brewery) => brewery.city === selectedBrewery.city).length
    : 0;

  const breweriesOfSameType = selectedBrewery
    ? breweries.filter(
        (brewery) => brewery.brewery_type === selectedBrewery.brewery_type
      ).length
    : 0;

  const openBreweryDetails = (breweryId) => {
    window.location.hash = `/brewery/${encodeURIComponent(breweryId)}`;
  };

  const goToDashboard = () => {
    window.location.hash = "/";
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType("all");
    setSelectedCity("all");
    setMinZip("");
    setMaxZip("");
  };

  const toggleChartVisibility = (chartKey) => {
    setVisibleCharts((currentVisibility) => ({
      ...currentVisibility,
      [chartKey]: !currentVisibility[chartKey],
    }));
  };

  return (
    <main className="app-shell">
      <div className="dashboard-layout">
        <Sidebar
          storyMessage={storyMessage}
          stats={stats}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedType={selectedType}
          breweryTypes={breweryTypes}
          selectedCity={selectedCity}
          cityOptions={cityOptions}
          onTypeChange={setSelectedType}
          onCityChange={setSelectedCity}
          minZip={minZip}
          maxZip={maxZip}
          onMinZipChange={setMinZip}
          onMaxZipChange={setMaxZip}
          onResetFilters={resetFilters}
          isDetailView={isDetailView}
          selectedBrewery={selectedBrewery}
          onGoHome={goToDashboard}
        />

        <section className="content-panel">
          {isLoading && <p className="status-message">Loading brewery data...</p>}

          {errorMessage && (
            <p className="status-message error-message">{errorMessage}</p>
          )}

          {!isLoading && !errorMessage && !isDetailView && (
            <>
              <DashboardCharts
                cityChartData={topCitiesData}
                typeChartData={typeDistributionData}
                chartVisibility={visibleCharts}
                onToggleChart={toggleChartVisibility}
              />

              <section className="list-section">
                <div className="section-heading">
                  <div>
                    <p className="section-kicker">Dashboard List</p>
                    <h2 className="section-title">Browse the brewery cards</h2>
                  </div>
                  <p className="section-caption">
                    Click any brewery card to open a direct detail view with more
                    location and profile information.
                  </p>
                </div>

                <BreweryList
                  breweries={filteredBreweries}
                  onSelectBrewery={openBreweryDetails}
                />
              </section>
            </>
          )}

          {!isLoading && !errorMessage && isDetailView && (
            <BreweryDetail
              brewery={selectedBrewery}
              detailUrl={detailUrl}
              onBackToDashboard={goToDashboard}
              breweriesInSameCity={breweriesInSameCity}
              breweriesOfSameType={breweriesOfSameType}
              formatLabel={formatLabel}
            />
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
