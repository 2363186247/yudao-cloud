import { useMemo, useState } from "react";
import DataTable from "../components/DataTable.jsx";
import DetailDrawer from "../components/DetailDrawer.jsx";
import MetricCard from "../components/MetricCard.jsx";
import SearchPanel from "../components/SearchPanel.jsx";
import SectionCard from "../components/SectionCard.jsx";

const columns = [
  { key: "name", title: "对象名称" },
  { key: "category", title: "业务类型" },
  { key: "area", title: "关联区域" },
  { key: "risk", title: "风险等级", type: "risk" },
  { key: "status", title: "状态", type: "status" },
  { key: "owner", title: "责任人" },
  { key: "time", title: "更新时间" },
];

export default function PageTemplate({ pageName, moduleName, mode = "list" }) {
  const [selected, setSelected] = useState(null);
  const rows = useMemo(() => createRows(pageName, moduleName), [pageName, moduleName]);

  return (
    <div className="page-stack">
      <div className="metric-grid">
        <MetricCard title="今日新增" value={mode === "report" ? 18 : 36} unit="条" trend="较昨日 +12%" />
        <MetricCard title="待处理" value={mode === "config" ? 9 : 24} unit="项" trend="重点核查 6 项" tone="amber" />
        <MetricCard title="高风险" value={mode === "network" ? 11 : 7} unit="个" trend="已同步预警" tone="red" />
        <MetricCard title="办结率" value="92" unit="%" trend="近7日稳定" tone="green" />
      </div>

      <SearchPanel />

      <SectionCard
        title={`${pageName}列表`}
        extra={
          <div className="button-row">
            <button className="btn ghost">批量导入</button>
            <button className="btn primary">新增记录</button>
          </div>
        }
      >
        <DataTable columns={columns} rows={rows} onRowClick={setSelected} />
      </SectionCard>

      <DetailDrawer open={Boolean(selected)} title={`${pageName}详情`} record={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function createRows(pageName, moduleName) {
  const categories = ["线索", "事件", "人员", "任务", "报告"];
  const risks = ["高", "中", "低"];
  const status = ["待研判", "处置中", "已办结", "监测中"];

  return Array.from({ length: 8 }, (_, index) => ({
    id: `${moduleName}-${pageName}-${index + 1}`,
    name: `${pageName}样本 ${String(index + 1).padStart(2, "0")}`,
    category: categories[index % categories.length],
    area: ["华东片区", "华北片区", "西南片区", "口岸区域"][index % 4],
    risk: risks[index % risks.length],
    status: status[index % status.length],
    owner: ["张明", "李华", "王磊", "赵敏"][index % 4],
    source: ["联网汇聚", "人工填报", "专题监测", "外部协查"][index % 4],
    time: `2026-05-${String(27 - index).padStart(2, "0")} 09:${String(20 + index).padStart(2, "0")}`,
  }));
}
