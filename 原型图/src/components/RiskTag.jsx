const riskMap = {
  高: "danger",
  中: "warning",
  低: "success",
};

export default function RiskTag({ value = "中" }) {
  return <span className={`tag risk ${riskMap[value] || "info"}`}>{value}风险</span>;
}
