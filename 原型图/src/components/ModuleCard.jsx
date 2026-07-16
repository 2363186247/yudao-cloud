import { ArrowRight } from "lucide-react";

export default function ModuleCard({ title, description, meta, onClick }) {
  return (
    <button className="module-card" onClick={onClick}>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="module-meta">
        <span>{meta}</span>
        <ArrowRight size={16} />
      </div>
    </button>
  );
}
