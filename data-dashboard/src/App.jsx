import { useEffect, useState } from "react";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import SearchBar from "./components/SearchBar";
import FilterDropdown from "./components/FilterDropdown";
import BreweryList from "./components/BreweryList";
import "./App.css";

function App() {
  const [breweries, setBreweries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await fetch(
          "https://api.openbrewerydb.org/v1/breweries?by_state=new_york&per_page=24"
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

    // useEffect runs after the component first appears on the page.
    // We use it here so the API request happens once when the app loads.
    fetchBreweries();
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

  const filteredBreweries = breweries.filter((brewery) => {
    const searchableText =
      `${brewery.name || ""} ${brewery.city || ""}`.toLowerCase();

    const matchesSearch = searchableText.includes(searchTerm.toLowerCase());

    const matchesType =
      selectedType === "all" || brewery.brewery_type === selectedType;

    // This filtering logic keeps only breweries that match both:
    // 1. the search text
    // 2. the selected dropdown filter
    return matchesSearch && matchesType;
  });

  const breweriesWithWebsites = filteredBreweries.filter(
    (brewery) => brewery.website_url
  ).length;

  const uniqueCities = new Set(
    filteredBreweries.map((brewery) => brewery.city)
  ).size;

  const averageBreweriesPerCity =
    uniqueCities === 0
      ? 0
      : (filteredBreweries.length / uniqueCities).toFixed(1);

  const typeCounts = filteredBreweries.reduce((counts, brewery) => {
    const currentType = brewery.brewery_type || "unknown";
    counts[currentType] = (counts[currentType] || 0) + 1;
    return counts;
  }, {});

  const mostCommonType =
    Object.keys(typeCounts).length === 0
      ? "No results"
      : Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0][0];

  const formatLabel = (value) =>
    value
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const formattedMostCommonType =
    mostCommonType === "No results" ? mostCommonType : formatLabel(mostCommonType);

  const storyMessage =
    filteredBreweries.length === 0
      ? "No breweries match the current search and filter. Try another search term or choose a different brewery type."
      : `${formattedMostCommonType} breweries stand out most in this view. The current results span ${uniqueCities} ${
          uniqueCities === 1 ? "city" : "cities"
        }, and ${breweriesWithWebsites} ${
          breweriesWithWebsites === 1 ? "brewery lists" : "breweries list"
        } a website, giving a quick snapshot of both local spread and online presence.`;

  const stats = [
    {
      label: "Breweries Shown",
      value: filteredBreweries.length,
      helpText: `Showing ${filteredBreweries.length} of ${breweries.length} breweries`,
    },
    {
      label: "Average Per City",
      value: averageBreweriesPerCity,
      helpText: "A quick look at how concentrated the current results are",
    },
    {
      label: "Most Common Type",
      value: formattedMostCommonType,
      helpText: "The brewery style that appears most often right now",
    },
  ];

  return (
    <main className="app-shell">
      <Header />

      <section className="story-panel">
        <p className="story-label">What This Snapshot Shows</p>
        <p className="story-text">{storyMessage}</p>
      </section>

      <StatsCards stats={stats} />

      <section className="controls-section">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <FilterDropdown
          selectedType={selectedType}
          options={breweryTypes}
          onFilterChange={setSelectedType}
        />
      </section>

      {isLoading && <p className="status-message">Loading brewery data...</p>}

      {errorMessage && <p className="status-message error-message">{errorMessage}</p>}

      {!isLoading && !errorMessage && (
        <BreweryList breweries={filteredBreweries} />
      )}
    </main>
  );
}

export default App;
