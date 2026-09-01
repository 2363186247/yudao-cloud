import { X } from "lucide-react";
import RiskTag from "./RiskTag.jsx";
import StatusTag from "./StatusTag.jsx";

export default function DetailDrawer({ open, title = "详情信息", record, onClose }) {
  if (!open || !record) return null;

  return (
    <div className="drawer-mask" onClick={onClose}>
      <aside className="detail-drawer" onClick={(event) => event.stopPropagation()}>
        <div className="drawer-head">
          <div>
            <div className="drawer-kicker">详情抽屉</div>
            <h2>{title}</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="关闭详情">
            <X size={18} />
          </button>
        </div>
        <div className="drawer-summary">
          <RiskTag value={record.risk} />
          <StatusTag value={record.status} />
        </div>
        <div className="drawer-grid">
          {Object.entries(record).map(([key, value]) => (
            <div key={key} className="drawer-field">
              <span>{fieldLabel[key] || key}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <div className="drawer-actions">
          <button className="btn ghost">加入关注</button>
          <button className="btn primary">进入研判</button>
        </div>
      </aside>
    </div>
  );
}

const fieldLabel = {
  id: "编号",
  name: "名称",
  category: "类型",
  owner: "责任人",
  source: "来源",
  time: "更新时间",
  status: "状态",
  risk: "风险等级",
  area: "关联区域",
};
