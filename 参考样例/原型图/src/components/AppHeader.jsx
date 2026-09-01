import { Bell, Building2, Search, ShieldCheck, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";
import { getDefaultChildPath, menuConfig } from "../config/menuConfig.js";

export default function AppHeader({ currentModuleKey }) {
  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand-mark">
          <ShieldCheck size={22} />
        </div>
        <div>
          <div className="brand-title">情报业务分析系统</div>
          <div className="brand-subtitle">Intelligence Analysis Platform</div>
        </div>
      </div>

      <nav className="top-nav" aria-label="一级模块">
        {menuConfig.map((module) => (
          <NavLink
            key={module.key}
            to={getDefaultChildPath(module.key)}
            className={module.key === currentModuleKey ? "top-nav-item active" : "top-nav-item"}
          >
            {module.title}
          </NavLink>
        ))}
      </nav>

      <div className="header-tools">
        <button className="icon-button" aria-label="全局搜索">
          <Search size={18} />
        </button>
        <button className="icon-button" aria-label="消息通知">
          <Bell size={18} />
        </button>
        <div className="org-chip">
          <Building2 size={16} />
          指挥中心
        </div>
        <div className="user-chip">
          <UserRound size={16} />
          分析员
        </div>
      </div>
    </header>
  );
}
