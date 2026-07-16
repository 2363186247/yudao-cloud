import { useNavigate } from "react-router-dom";
import SectionCard from "../../../components/SectionCard.jsx";
import { quickTools } from "../mockData.js";

export default function QuickToolsCard() {
  const navigate = useNavigate();

  return (
    <SectionCard title="工具快捷入口" className="quick-tools-card">
      <div className="quick-tools-grid">
        {quickTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button key={tool.title} className="quick-tool" onClick={() => navigate(tool.path)}>
              <Icon size={25} />
              <span>{tool.title}</span>
            </button>
          );
        })}
      </div>
    </SectionCard>
  );
}
