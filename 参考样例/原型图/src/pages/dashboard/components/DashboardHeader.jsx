import { dashboardActions } from "../mockData.js";

export default function DashboardHeader() {
  return (
    <div className="dashboard-header">
      <div>
        <div className="breadcrumb">首页 / 工作台 / <span>个人工作台</span></div>
        <h1>个人工作台</h1>
      </div>
      <div className="dashboard-actions">
        {dashboardActions.map((action) => {
          const Icon = action.icon;
          return (
            <button key={action.title} className={action.primary ? "btn primary" : "btn ghost"}>
              <Icon size={16} />
              {action.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
