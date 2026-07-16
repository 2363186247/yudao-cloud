import { useState } from "react";
import SectionCard from "../../../components/SectionCard.jsx";
import { dynamicRanks } from "../mockData.js";

const tabs = [
  { key: "international", title: "国际动态" },
  { key: "domestic", title: "国内动态" },
];

export default function DynamicRankCard({ onSelect }) {
  const [activeTab, setActiveTab] = useState("international");
  const rows = dynamicRanks[activeTab];

  return (
    <SectionCard
      title="动态热榜"
      className="dynamic-rank-card"
      extra={
        <div className="dashboard-tabs">
          {tabs.map((tab) => (
            <button key={tab.key} className={activeTab === tab.key ? "active" : ""} onClick={() => setActiveTab(tab.key)}>
              {tab.title}
            </button>
          ))}
        </div>
      }
    >
      <div className="dashboard-rank-list">
        {rows.map((item, index) => (
          <button key={item.id} className="dashboard-rank-item" onClick={() => onSelect(item)}>
            <span className={index < 3 ? "rank-index hot" : "rank-index"}>{index + 1}</span>
            <span className="rank-main">
              <strong>{item.title}</strong>
              <em>{item.source}</em>
            </span>
            <span className="rank-time">{item.time}</span>
          </button>
        ))}
      </div>
    </SectionCard>
  );
}
