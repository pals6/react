function DashboardCharts({
  cityChartData,
  typeChartData,
  chartVisibility,
  onToggleChart,
}) {
  const hasVisibleCharts = Object.values(chartVisibility).some(Boolean);

  return (
    <section className="charts-section">
      <div className="section-heading">
        <div>
          <p className="section-kicker">Visual Storytelling</p>
          <h2 className="section-title">Two different views of the dataset</h2>
        </div>
        <p className="section-caption">
          One chart focuses on where breweries cluster, and the other shows how
          the brewery types are distributed across the current filtered results.
        </p>
      </div>

      <div className="chart-toggle-group" aria-label="Chart visibility toggles">
        <button
          className={`chart-toggle ${
            chartVisibility.citySpread ? "active-toggle" : ""
          }`}
          type="button"
          onClick={() => onToggleChart("citySpread")}
        >
          {chartVisibility.citySpread ? "Hide" : "Show"} city chart
        </button>
        <button
          className={`chart-toggle ${
            chartVisibility.typeDistribution ? "active-toggle" : ""
          }`}
          type="button"
          onClick={() => onToggleChart("typeDistribution")}
        >
          {chartVisibility.typeDistribution ? "Hide" : "Show"} type chart
        </button>
      </div>

      {!hasVisibleCharts && (
        <p className="status-message">
          Both charts are hidden right now. Use the toggle buttons above to bring
          a visualization back into view.
        </p>
      )}

      <div className="charts-grid">
        {chartVisibility.citySpread && <CityBarChart data={cityChartData} />}
        {chartVisibility.typeDistribution && (
          <TypeDonutChart data={typeChartData} />
        )}
      </div>
    </section>
  );
}

function CityBarChart({ data }) {
  const chartWidth = 420;
  const chartHeight = 250;
  const baselineY = 180;
  const maxValue = Math.max(...data.map((entry) => entry.value), 1);
  const barGap = 18;
  const chartPadding = 28;
  const usableWidth = chartWidth - chartPadding * 2;
  const barWidth =
    data.length === 0
      ? usableWidth
      : (usableWidth - barGap * Math.max(data.length - 1, 0)) / data.length;

  return (
    <article className="chart-card">
      <div className="chart-card-header">
        <h3>Top Cities by Brewery Count</h3>
        <p className="chart-description">
          This view shows which New York cities dominate the currently filtered
          brewery list.
        </p>
      </div>

      {data.length === 0 ? (
        <p className="chart-empty">
          No city data is available for the current filter combination.
        </p>
      ) : (
        <>
          <svg
            className="chart-svg"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            role="img"
            aria-label="Bar chart showing brewery counts by city"
          >
            <line
              x1="20"
              y1={baselineY}
              x2={chartWidth - 20}
              y2={baselineY}
              stroke="#bfd0db"
              strokeWidth="2"
            />

            {data.map((entry, index) => {
              const barHeight = (entry.value / maxValue) * 120;
              const x = chartPadding + index * (barWidth + barGap);
              const y = baselineY - barHeight;
              const truncatedLabel =
                entry.label.length > 10
                  ? `${entry.label.slice(0, 10)}...`
                  : entry.label;

              return (
                <g key={entry.label}>
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    rx="10"
                    fill={entry.color}
                  />
                  <text
                    x={x + barWidth / 2}
                    y={y - 8}
                    textAnchor="middle"
                    className="chart-value-text"
                  >
                    {entry.value}
                  </text>
                  <text
                    x={x + barWidth / 2}
                    y={baselineY + 18}
                    textAnchor="middle"
                    className="chart-label-text"
                  >
                    {truncatedLabel}
                  </text>
                </g>
              );
            })}
          </svg>

          <p className="chart-annotation">
            The tallest bar marks the city with the strongest brewery concentration
            in the active view.
          </p>
        </>
      )}
    </article>
  );
}

function TypeDonutChart({ data }) {
  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  const radius = 58;
  const circumference = 2 * Math.PI * radius;

  return (
    <article className="chart-card">
      <div className="chart-card-header">
        <h3>Brewery Type Distribution</h3>
        <p className="chart-description">
          This chart breaks the filtered breweries into type categories so it is
          easier to compare style mix at a glance.
        </p>
      </div>

      {data.length === 0 || total === 0 ? (
        <p className="chart-empty">
          No brewery type data is available for the current filter combination.
        </p>
      ) : (
        <div className="donut-layout">
          <svg
            className="donut-svg"
            viewBox="0 0 200 200"
            role="img"
            aria-label="Donut chart showing brewery type distribution"
          >
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#e4ecef"
              strokeWidth="28"
            />

            {data.map((entry, index) => {
              const previousValues = data
                .slice(0, index)
                .reduce((sum, currentEntry) => sum + currentEntry.value, 0);
              const dashLength = circumference * (entry.value / total);
              const dashOffset = circumference * (previousValues / total);

              return (
                <circle
                  key={entry.label}
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke={entry.color}
                  strokeWidth="28"
                  strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                  strokeDashoffset={-dashOffset}
                  transform="rotate(-90 100 100)"
                />
              );
            })}

            <text x="100" y="96" textAnchor="middle" className="donut-total">
              {total}
            </text>
            <text x="100" y="116" textAnchor="middle" className="donut-subtotal">
              breweries
            </text>
          </svg>

          <ul className="chart-legend">
            {data.map((entry) => (
              <li className="legend-row" key={entry.label}>
                <span
                  className="legend-swatch"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="legend-label">{entry.label}</span>
                <span className="legend-value">
                  {Math.round((entry.value / total) * 100)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

export default DashboardCharts;
