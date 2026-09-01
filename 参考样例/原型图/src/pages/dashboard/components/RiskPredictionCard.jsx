import { useNavigate } from "react-router-dom";
import SectionCard from "../../../components/SectionCard.jsx";
import { riskPrediction } from "../mockData.js";

export default function RiskPredictionCard() {
  const navigate = useNavigate();

  const openRisk = (level) => {
    navigate(`/warning/rank?risk=${encodeURIComponent(level.risk)}&level=${level.key}`);
  };

  return (
    <SectionCard
      title="风险预测"
      className="risk-prediction-card"
      extra={
        <select className="compact-select" defaultValue="24">
          <option value="24">24小时</option>
          <option value="72">72小时</option>
          <option value="168">近7天</option>
        </select>
      }
    >
      <div className="risk-prediction-body">
        <div className="risk-ring" aria-label={`热点事件总数 ${riskPrediction.total}`}>
          <div>
            <strong>{riskPrediction.total}</strong>
            <span>事件总数</span>
          </div>
        </div>
        <div className="risk-level-list">
          {riskPrediction.levels.map((level) => (
            <button key={level.key} className="risk-level-item" onClick={() => openRisk(level)}>
              <span className="risk-level-icon" style={{ color: level.color }}>
                !
              </span>
              <span className="risk-level-name">{level.label}</span>
              <strong>{level.value}</strong>
              <em>({level.percent})</em>
              <span className="risk-progress">
                <i style={{ width: level.percent, background: level.color }} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
