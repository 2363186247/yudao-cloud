import SectionCard from "../../../components/SectionCard.jsx";
import { summaryMetrics } from "../mockData.js";

export default function SummaryMetrics() {
  return (
    <SectionCard
      title="数据汇总"
      className="dashboard-summary-card"
      extra={
        <select className="compact-select" defaultValue="30">
          <option value="30">近30天</option>
          <option value="7">近7天</option>
          <option value="1">今日</option>
        </select>
      }
    >
      <div className="summary-metrics-grid">
        {summaryMetrics.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.key} className="summary-metric">
              <div className={`summary-icon tone-${item.tone}`}>
                <Icon size={24} />
              </div>
              <div>
                <div className="summary-title">{item.title}</div>
                <div className="summary-value">{item.value}</div>
                <div className="summary-change">月增 {item.change} ↑</div>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}
