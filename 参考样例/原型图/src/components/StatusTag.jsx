const statusMap = {
  待研判: "warning",
  处置中: "info",
  已办结: "success",
  已推送: "success",
  已订阅: "info",
  监测中: "info",
};

export default function StatusTag({ value = "待研判" }) {
  return <span className={`tag status ${statusMap[value] || "info"}`}>{value}</span>;
}
