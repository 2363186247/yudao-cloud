import { useState } from "react";
import SectionCard from "../../../components/SectionCard.jsx";
import { followDynamics } from "../mockData.js";

const tabs = [
  { key: "local", title: "本地" },
  { key: "media", title: "自媒体" },
];

export default function FollowDynamicsCard({ onSelect }) {
  const [activeTab, setActiveTab] = useState("local");
  const rows = followDynamics[activeTab];

  return (
    <SectionCard
      title="关注动态"
      className="follow-dynamics-card"
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
      <div className="follow-list">
        {rows.map((item) => (
          <button key={item.id} className="follow-item" onClick={() => onSelect(item)}>
            <span className="dot" />
            <strong>{item.title}</strong>
            <span>{item.source}</span>
            <time>{item.time}</time>
          </button>
        ))}
      </div>
    </SectionCard>
  );
}
