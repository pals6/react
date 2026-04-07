function StatsCards({ stats }) {
  return (
    <section className="stats-grid">
      {stats.map((stat) => (
        <article className="stat-card" key={stat.label}>
          <p className="stat-label">{stat.label}</p>
          <h2 className="stat-value">{stat.value}</h2>
          <p className="stat-help">{stat.helpText}</p>
        </article>
      ))}
    </section>
  );
}

export default StatsCards;
