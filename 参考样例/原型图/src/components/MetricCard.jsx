export default function MetricCard({ title, value, unit, trend, tone = "blue" }) {
  return (
    <div className={`metric-card tone-${tone}`}>
      <div className="metric-title">{title}</div>
      <div className="metric-value">
        {value}
        {unit ? <span>{unit}</span> : null}
      </div>
      {trend ? <div className="metric-trend">{trend}</div> : null}
    </div>
  );
}
