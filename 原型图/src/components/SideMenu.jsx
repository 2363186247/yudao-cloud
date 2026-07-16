import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function SideMenu({ moduleItem, activePath }) {
  return (
    <aside className="side-menu">
      <div className="side-title">
        <span>{moduleItem.title}</span>
      </div>
      <div className="side-list">
        {moduleItem.children.map((item) => (
          <NavLink key={item.path} to={item.path} className={item.path === activePath ? "side-link active" : "side-link"}>
            <span>{item.title}</span>
            <ChevronRight size={15} />
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
