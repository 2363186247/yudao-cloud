import { useState } from "react";
import DetailDrawer from "../../components/DetailDrawer.jsx";
import DashboardHeader from "./components/DashboardHeader.jsx";
import DynamicRankCard from "./components/DynamicRankCard.jsx";
import FollowDynamicsCard from "./components/FollowDynamicsCard.jsx";
import HotWordsCard from "./components/HotWordsCard.jsx";
import InfoSearchCard from "./components/InfoSearchCard.jsx";
import QuickToolsCard from "./components/QuickToolsCard.jsx";
import RiskPredictionCard from "./components/RiskPredictionCard.jsx";
import SummaryMetrics from "./components/SummaryMetrics.jsx";

export default function DashboardPage() {
  const [selectedRecord, setSelectedRecord] = useState(null);

  const openDrawer = (record) => {
    setSelectedRecord({
      ...record,
      name: record.title,
      owner: "情报研判组",
      time: record.time,
    });
  };

  return (
    <div className="dashboard-page">
      <DashboardHeader />
      <SummaryMetrics />

      <div className="dashboard-layout-grid top">
        <InfoSearchCard />
        <HotWordsCard />
        <DynamicRankCard onSelect={openDrawer} />
      </div>

      <div className="dashboard-layout-grid bottom">
        <FollowDynamicsCard onSelect={openDrawer} />
        <RiskPredictionCard />
        <QuickToolsCard />
      </div>

      <DetailDrawer
        open={Boolean(selectedRecord)}
        title="动态详情"
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
      />
    </div>
  );
}
